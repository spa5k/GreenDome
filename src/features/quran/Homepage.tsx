import { Input } from "@/components/ui/input";
import QuranDataLocal from "./data/quran.json";
import { datafiltersCache } from "./hooks/datafilter-server";
import { JuzCard } from "./JuzCard";
import { QuranFilters } from "./QuranFilters";
import QuranCard from "./SurahCard";
import { type Chapter, type JuzsReference, QuranData, Revelation } from "./types";

function filterData(data: QuranData, filter?: string): Chapter[] | JuzsReference[] {
  switch (filter) {
    case "surah":
      return data.chapters;
    case "juz":
      return data.juzs.references;
    case "mecca":
      return data.chapters.filter((chapter) => chapter.revelation === Revelation.Mecca);
    case "medina":
      return data.chapters.filter((chapter) => chapter.revelation === Revelation.Madina);
    default:
      return data.chapters;
  }
}
function sortData(
  data: Chapter[] | JuzsReference[],
  filter: string,
  sort?: string,
  order?: string,
): Chapter[] | JuzsReference[] {
  const sortOrder = order === "desc" ? -1 : 1;

  if (["surah", "mecca", "medina"].includes(filter)) {
    return data.sort((a, b) => {
      if (sort === "number" && "chapter" in a && "chapter" in b) {
        return (a.chapter - b.chapter) * sortOrder;
      } else if (sort === "name" && "name" in a && "name" in b) {
        return a.name.localeCompare(b.name) * sortOrder;
      } else if (sort === "revelation" && "revelation" in a && "revelation" in b) {
        return a.revelation.localeCompare(b.revelation) * sortOrder;
      }
      return 0;
    });
  }

  if (filter === "juz") {
    return data.sort((a, b) => {
      if (sort === "number" && "juz" in a && "juz" in b) {
        return (a.juz - b.juz) * sortOrder;
      } else if (sort === "name" && "name" in a && "name" in b) {
        return a.name.localeCompare(b.name) * sortOrder;
      }
      return 0;
    });
  }

  return data;
}

export async function QuranHomepage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const data = QuranDataLocal;
  const { filter, sort, order } = datafiltersCache.parse(searchParams);

  let dataToDisplay = filterData(data, filter);
  dataToDisplay = sortData(dataToDisplay, filter || "surah", sort, order);

  const dataType = filter === "juz" ? "juz" : "surah";

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="container max-w-5xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 font-cursive">
            Explore the Quranic Surahs
          </h1>
          <div className="w-full max-w-xl">
            <Input
              className="w-full px-4 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-gray-100"
              placeholder="Search for a surah..."
              type="search"
            />
          </div>
          <QuranFilters />
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataType === "juz"
              ? (dataToDisplay as JuzsReference[]).map((juz) => <JuzCard juz={juz} key={juz.arabic_name} />)
              : (dataToDisplay as Chapter[]).map((chapter, index) => (
                <QuranCard
                  key={chapter.name}
                  chapter={chapter}
                  juzStart={data.chapters[index]?.verses[0]?.juz || 0}
                  juzEnd={data.chapters[index]?.verses?.[data.chapters[index]?.verses?.length! - 1]?.juz ?? 0}
                />
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
