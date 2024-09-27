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
import { Suspense } from "react";
import { searchParamsCache } from "../params";

import { fetchTranslations } from "@/features/ayah/api/translations";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { number: string } }): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/quran/${params.number}`,
    },
  };
}

const fonts =
  `${cormorant_garamond.variable} ${lexend.variable} ${readex_pro.variable} ${indopak.variable} font-primary ${noto_sans_devanagari.variable} ${noto_nastaliq_urdu.variable} ${uthmanic.variable} ${noto_sans_arabic.variable}`;
type FetchFunction = typeof fetchAyahs | typeof fetchAyahsQFC | typeof fetchTranslations;

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: Record<string, string | string[] | undefined>;
  params?: { surahId?: string };
}): Promise<JSX.Element> {
  const { q: quranEditionParams, t: translationEditionParams } = searchParamsCache.parse(searchParams);

  const quranEditionsSelectedData = quranEditions.find((quranEdition) => quranEdition.slug === quranEditionParams);
  if (!quranEditionsSelectedData) {
    return <p>Not found</p>;
  }

  const translationEditionParamsArray = translationEditionParams ?? [];
  const translationEditionsSelectedData: Edition[] = translationEditionParamsArray
    .map((edition) => translationEditions.find((translationEdition) => translationEdition.slug === edition))
    .filter((edition): edition is Edition => edition !== undefined);

  const fetchEditions = async (
    editions: Edition[],
    fetchFunction: FetchFunction,
    surahNumber: number,
  ) => {
    const results = await Promise.allSettled(editions.map(async (edition) => {
      if (edition.type === "QURAN_QFC") {
        const version = edition.id === 1 ? "v1" : "v2";
        const ayahs = await fetchAyahsQFC(
          version,
          surahNumber,
        );
        return { ...edition, ayahs };
      } else {
        const ayahs = await fetchFunction(
          // @ts-ignore
          surahNumber,
          edition.slug,
        );
        return { ...edition, ayahs };
      }
    }));

    return results.map((result) => {
      if (result.status === "fulfilled") {
        return result.value;
      } else {
        console.error(`Failed to fetch edition:`, result.reason);
        return null;
      }
    }).filter((edition): edition is Edition & { ayahs: Ayah[] | AyahQFC[] } => edition !== null);
  };

  const surahNumber = parseInt(params?.surahId ?? "1");

  const [quranEditionsFetched, translationEditionsFetched, fallbackAyahs] = await Promise.all([
    fetchEditions([quranEditionsSelectedData], fetchAyahs, surahNumber),
    fetchEditions(translationEditionsSelectedData, fetchTranslations, surahNumber),
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
            defaultSelected={quranEditionParams}
          />
          <EditionMultiSelectForm
            edition={translationEditions}
            queryParam="t"
            placeholder="Select Translation Edition"
            description="Select the translation edition you want to view"
            defaultSelected={translationEditionParams?.map((edition) => edition.toString())}
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
