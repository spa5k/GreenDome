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
import { logger } from "@/lib/logger"; // Assume we have a custom logger
import { Suspense } from "react";

const fonts =
  `${cormorant_garamond.variable} ${lexend.variable} ${readex_pro.variable} ${indopak.variable} font-primary ${noto_sans_devanagari.variable} ${noto_nastaliq_urdu.variable} ${uthmanic.variable} ${noto_sans_arabic.variable}`;

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
  params?: { number?: string };
}): Promise<JSX.Element> {
  function parseEditions(editions: string): string[] {
    return editions.split(",").map((edition) => edition.trim()).filter(edition => edition !== "");
  }

  const quranEditionsSelected = parseEditions(searchParams?.q ?? "ara-quranindopak");
  const translationEditionsSelected = parseEditions(searchParams?.t ?? "eng-mustafakhattaba");

  const quranEditionsSelectedData: Edition[] = quranEditionsSelected.map(
    (edition) => quranEditions.find((quranEdition) => quranEdition.slug === edition),
  ).filter((edition): edition is Edition => edition !== undefined);

  const translationEditionsSelectedData: Edition[] = translationEditionsSelected.map(
    (edition) => translationEditions.find((translationEdition) => translationEdition.slug === edition),
  ).filter((edition): edition is Edition => edition !== undefined);

  const fetchEditions = async (
    editions: Edition[],
    fetchFunction: typeof fetchAyahs | typeof fetchAyahsQFC,
    surahNumber: number,
  ) => {
    const results = await Promise.allSettled(editions.map(async (edition) => {
      try {
        const ayahs = await fetchFunction(
          // @ts-ignore
          surahNumber,
          edition.slug,
        );
        return { ...edition, ayahs };
      } catch (error) {
        logger.error(`Failed to fetch ayahs for edition ${edition.id}:`, error);
        return { ...edition, ayahs: [] };
      }
    }));

    return results.map((result) => {
      if (result.status === "fulfilled") {
        return result.value;
      } else {
        logger.error(`Failed to fetch edition:`, result.reason);
        return null;
      }
    }).filter((edition): edition is Edition & { ayahs: Ayah[] | AyahQFC[] } => edition !== null);
  };

  const surahNumber = parseInt(params?.number ?? "1");

  const [quranEditionsFetched, translationEditionsFetched, fallbackAyahs] = await Promise.all([
    fetchEditions(quranEditionsSelectedData, fetchAyahs, surahNumber),
    fetchEditions(translationEditionsSelectedData, fetchAyahs, surahNumber),
    fetchAyahs(surahNumber, "ara-quranindopak"),
  ]);

  const referenceAyahs = quranEditionsFetched[0]?.ayahs || [];

  const isAyahQFC = (ayah: AyahQFC | Ayah): ayah is AyahQFC => {
    return (ayah as AyahQFC)?.page !== undefined;
  };

  return (
    <main className={`mt-20 flex gap-4 flex-col ${fonts} items-center`}>
      <Suspense fallback={<div>Loading edition selectors...</div>}>
        <div className="flex-col gap-4 md:flex md:flex-row md:gap-8">
          <EditionSingleSelect
            edition={quranEditions}
            queryParam="q"
            placeholder="Select Quran Font"
            description="Select the Quran Font you want to view"
            defaultSelected={quranEditionsSelected[0]?.toString()}
          />
          <EditionMultiSelectForm
            edition={translationEditions}
            queryParam="t"
            placeholder="Select Translation Edition"
            description="Select the translation edition you want to view"
            defaultSelected={translationEditionsSelected.map((edition) => edition.toString())}
          />
        </div>
      </Suspense>
      <DynamicFontSizer />
      <SelectReciter />
      <Suspense fallback={<div>Loading Ayahs...</div>}>
        <div className="flex flex-col gap-8 w-full justify-center md:w-1/2">
          <AyahList
            ayahs={referenceAyahs}
            fallbackAyahs={fallbackAyahs}
            quranEditionsFetched={quranEditionsFetched}
            translationEditionsFetched={translationEditionsFetched}
            key={quranEditionsFetched[0]?.id ?? "default"}
            version={isAyahQFC(referenceAyahs[0]) ? (quranEditionsFetched[0]?.id === 1 ? "v1" : "v2") : undefined}
          />
        </div>
      </Suspense>
      <RecitationBar />
    </main>
  );
}
