import quranData from "../data/quran.json";

export async function isLocalhostReachable(): Promise<boolean> {
  try {
    const response = await fetch("http://localhost:50000/health", {
      cache: "no-cache",
      mode: "no-cors",
    });
    const body = await response.text();
    return response.status === 200 && body === "Hono!";
  } catch (error) {
    return false;
  }
}

abstract class AyahService {
  public abstract fetchAyahs(
    editionId: number,
    surah: number,
    editionName: string,
  ): Promise<Ayah[]>;

  public abstract fetchAyahsQFC(
    version: "v1" | "v2",
    surahNumber: number,
  ): Promise<AyahQFC[]>;
}

export class LocalAyahService extends AyahService {
  public async fetchAyahs(
    editionId: number,
    surah: number,
    editionName: string,
  ): Promise<Ayah[]> {
    const response = await fetch(
      `http://localhost:50000/surah/${surah}/${editionId}`,
    );
    return await response.json();
  }

  public async fetchAyahsQFC(
    version: "v1" | "v2",
    surahNumber: number,
  ): Promise<AyahQFC[]> {
    const textFile = version === "v2" ? "mushaf-v2.txt" : "mushaf.txt";

    const textFileUrl = `https://raw.githubusercontent.com/mustafa0x/qpc-fonts/master/${textFile}`;

    const ayahTextFile = await fetch(textFileUrl);

    const ayahLines = (await ayahTextFile.text()).trim().split("\n");
    // const ayahLines = ayahTextFile.trim().split("\n");

    const chapter = quranData.chapters.find((ch) => ch.chapter === surahNumber);

    if (!chapter) {
      throw new Error(`Surah number ${surahNumber} not found`);
    }

    const ayahs: AyahQFC[] = [];

    // Map each verse to its corresponding text line
    chapter.verses.forEach((verse, index) => {
      const text = ayahLines[index];
      if (text) {
        ayahs.push({
          id: verse.line,
          surah: surahNumber,
          ayah: verse.verse,
          page: verse.page,
          text,
        });
      }
    });

    return ayahs;
  }
}

export class RemoteAyahService extends AyahService {
  public async fetchAyahs(
    editionId: number,
    surah: number,
    editionName: string,
  ): Promise<Ayah[]> {
    const urls = [
      `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/${editionName}/${surah}.json`,
      `https://rawcdn.githack.com/fawazahmed0/quran-api/ffd3f3a2d44f5206acf0579878e6a0e5634899fa/editions/${editionName}/${surah}.json`,
      `https://cdn.statically.io/gh/fawazahmed0/quran-api/1/editions/${editionName}/${surah}.json`,
      `https://raw.githubusercontent.com/fawazahmed0/quran-api/1/editions/${editionName}/${surah}.json`,
      `https://gitloaf.com/cdn/fawazahmed0/quran-api/1/editions/${editionName}/${surah}.json`,
    ];

    for (const url of urls) {
      try {
        const response = await fetch(url, {
          cache: "force-cache",
        });
        const data = await response.json();
        return this.formatAyahs(data.chapter, editionId);
      } catch (error) {
        console.error("Failed to fetch from URL:", url, "; Error:", error);
      }
    }

    throw new Error("All URLs failed to fetch data.");
  }

  formatAyahs(chapter: any[], editionId: number): Ayah[] {
    return chapter.map((ayah: AyahQuranApiAyah) => ({
      id: ayah.chapter,
      surah: ayah.chapter,
      ayah: ayah.verse,
      editionId,
      text: ayah.text,
    }));
  }

  public async fetchAyahsQFC(
    version: "v1" | "v2",
    surahNumber: number,
  ): Promise<AyahQFC[]> {
    const textFile = version === "v2" ? "mushaf-v2.txt" : "mushaf.txt";

    const textFileUrl = `https://raw.githubusercontent.com/mustafa0x/qpc-fonts/master/${textFile}`;

    const ayahTextFile = await fetch(textFileUrl);

    const ayahLines = (await ayahTextFile.text()).trim().split("\n");

    const chapter = quranData.chapters.find((ch) => ch.chapter === surahNumber);

    if (!chapter) {
      throw new Error(`Surah number ${surahNumber} not found`);
    }

    const ayahs: AyahQFC[] = [];
    // get start verse page number and end verse page number
    const lineStart = chapter.verses[0].line;
    const lineEnd = chapter.verses[chapter.verses.length - 1].line;

    // use the lineStart as line number to get the verse
    for (let i = lineStart; i <= lineEnd; i++) {
      const text = ayahLines[i - 1];
      if (text) {
        ayahs.push({
          id: i,
          surah: surahNumber,
          ayah: chapter.verses.find((verse) => verse.line === i)?.verse ?? 0,
          page: chapter.verses.find((verse) => verse.line === i)?.page ?? 0,
          text,
        });
      }
    }

    return ayahs;
  }
}

export const fetchAyahs = async (
  editionId: number,
  surah: number,
  editionName: string,
): Promise<Ayah[]> => {
  const isLocalhost = await isLocalhostReachable();
  const service = isLocalhost
    ? new LocalAyahService()
    : new RemoteAyahService();
  return await service.fetchAyahs(editionId, surah, editionName);
};

export const fetchAyahsQFC = async (
  version: "v1" | "v2",
  surahNumber: number,
): Promise<AyahQFC[]> => {
  const isLocalhost = await isLocalhostReachable();
  const service = isLocalhost
    ? new LocalAyahService()
    : new RemoteAyahService();
  return await service.fetchAyahsQFC(version, surahNumber);
};

export type Ayah = {
  id: number;
  surah: number;
  ayah: number;
  editionId: number;
  text: string;
};

export interface AyahQuranAPI {
  chapter: AyahQuranApiAyah[];
}

export interface AyahQuranApiAyah {
  chapter: number;
  verse: number;
  text: string;
}
export type AyahQFC = {
  id: number;
  surah: number;
  ayah: number;
  page: number;
  text: string;
};
export function isAyahQFC(ayah: AyahQFC | Ayah): ayah is AyahQFC {
  return (ayah as AyahQFC).page !== undefined;
}
