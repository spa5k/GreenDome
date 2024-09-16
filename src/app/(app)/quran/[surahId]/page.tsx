import type { Edition } from "@/features/edition/api/edition";
import { EditionMultiSelectForm } from "@/features/edition/components/EditionMultiSelect";
import { EditionSingleSelect } from "@/features/edition/components/EditionSingleSelect";
import { quranEditions } from "@/features/edition/data/quranEditions";
import { translationEditions } from "@/features/edition/data/translationEditions";
import { type Ayah, type AyahQFC, fetchAyahs, fetchAyahsQFC } from "@/features/quran/api/ayah";
import AyahList from "@/features/quran/ayah-list";
import { DynamicFontSizer } from "@/features/quran/font-sizer";
import { RecitationBar } from "@/features/recitation/components/RecitationBar";
import { SelectReciter } from "@/features/recitation/components/SelectReciter";
import {
  cormorant_garamond,
  indopak,
  lexend,
  noto_nastaliq_urdu,
  noto_sans_arabic,
  noto_sans_devanagari,
  readex_pro,
  uthmanic,
} from "@/lib/fonts";

export default async function Page({
  searchParams,
  params,
}: {
  searchParams?: {
    q?: string;
    t?: string;
    tl?: string;
    start?: string;
    end?: string;
  };
  params?: { number: string };
}): Promise<JSX.Element> {
  function parseEditions(editions: string): number[] {
    return editions.split(",").map((edition) => parseInt(edition.trim())).filter(edition => !isNaN(edition));
  }

  const quranEditionsSelected = parseEditions(searchParams?.q ?? "145");
  const translationEditionsSelected = parseEditions(searchParams?.t ?? "211");

  const quranEditionsSelectedData: Edition[] = quranEditionsSelected.map(
    (edition) => quranEditions.find((quranEdition) => quranEdition.id === edition),
  ).filter((edition): edition is Edition => edition !== undefined);

  const translationEditionsSelectedData: Edition[] = translationEditionsSelected.map(
    (edition) => translationEditions.find((translationEdition) => translationEdition.id === edition),
  ).filter((edition): edition is Edition => edition !== undefined);

  const quranEditionsFetched = await Promise.all(quranEditionsSelectedData.map(async (quranEdition) => {
    try {
      if (quranEdition.type === "QURAN_QFC") {
        const version = quranEdition.id === 1 ? "v1" : "v2";
        const ayahs = await fetchAyahsQFC(
          version,
          parseInt(params?.number ?? "1"),
        );
        return { ...quranEdition, ayahs };
      } else {
        const ayahs = await fetchAyahs(
          quranEdition.id,
          parseInt(params?.number ?? "1"),
          quranEdition.slug,
        );
        return { ...quranEdition, ayahs };
      }
    } catch (error) {
      console.error(`Failed to fetch ayahs for edition ${quranEdition.id}:`, error);
      return { ...quranEdition, ayahs: [] };
    }
  }));

  const translationEditionsFetched = await Promise.all(
    translationEditionsSelectedData.map(async (translationEdition) => {
      try {
        const ayahs = await fetchAyahs(
          translationEdition.id,
          parseInt(params?.number ?? "1"),
          translationEdition.slug,
        );
        return { ...translationEdition, ayahs };
      } catch (error) {
        console.error(`Failed to fetch ayahs for translation edition ${translationEdition.id}:`, error);
        return { ...translationEdition, ayahs: [] };
      }
    }),
  );

  // Fetch the fallback edition (ID 146)
  const fallbackEdition = quranEditions.find((edition) => edition.id === 146);
  let fallbackAyahs: Ayah[] = [];
  if (fallbackEdition) {
    try {
      fallbackAyahs = await fetchAyahs(
        fallbackEdition.id,
        parseInt(params?.number ?? "1"),
        fallbackEdition.slug,
      );
    } catch (error) {
      console.error(`Failed to fetch ayahs for fallback edition 146:`, error);
    }
  }

  // Assuming the first Quran edition is the reference for ayah order
  const referenceAyahs = quranEditionsFetched[0]?.ayahs || [];

  const fonts =
    `${cormorant_garamond.variable} ${lexend.variable} ${readex_pro.variable} ${indopak.variable} font-primary ${noto_sans_devanagari.variable} ${noto_nastaliq_urdu.variable} ${uthmanic.variable} ${noto_sans_arabic.variable}`;

  function isAyahQFC(ayah: AyahQFC | Ayah): ayah is AyahQFC {
    return (ayah as AyahQFC).page !== undefined;
  }

  return (
    <main className={`mt-20 flex gap-4 flex-col ${fonts} items-center`}>
      <div className="flex-col gap-4 md:flex md:flex-row md:gap-8">
        <EditionSingleSelect
          edition={quranEditions}
          queryParam="q"
          placeholder="Select Quran Font"
          description="Select the Quran Font you want to view"
          defaultSelected={quranEditionsSelected[0].toString()}
        />
        <EditionMultiSelectForm
          edition={translationEditions}
          queryParam="t"
          placeholder="Select Translation Edition"
          description="Select the translation edition you want to view"
          defaultSelected={translationEditionsSelected.map((edition) => edition.toString())}
        />
      </div>
      <DynamicFontSizer />
      <SelectReciter />
      <div className="flex flex-col gap-8 w-full justify-center md:w-1/2">
        <AyahList
          ayahs={referenceAyahs}
          fallbackAyahs={fallbackAyahs}
          quranEditionsFetched={quranEditionsFetched}
          translationEditionsFetched={translationEditionsFetched}
          key={quranEditionsFetched[0].id}
          version={isAyahQFC(referenceAyahs[0]) ? (quranEditionsFetched[0].id === 1 ? "v1" : "v2") : undefined}
        />
      </div>
      <RecitationBar />
    </main>
  );
}
