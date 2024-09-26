import { type Ayah, type AyahQuranApiAyah, isLocalhostReachable } from "@/features/quran/api/ayah";

abstract class TranslationService {
  public abstract fetchAyahs(
    surah: number,
    editionName: string,
  ): Promise<Ayah[]>;
}

export class LocalTranslationService extends TranslationService {
  public async fetchAyahs(
    surah: number,
    editionName: string,
  ): Promise<Ayah[]> {
    const url = `http://localhost:50000/translations/${surah}/${editionName}`;

    const response = await fetch(url, { cache: "no-store" });
    const res = await response.json();

    return res;
  }
}

export class RemoteTranslationService extends TranslationService {
  public async fetchAyahs(
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
        return this.formatAyahs(data.chapter, editionName);
      } catch (error) {
        console.error("Failed to fetch from URL:", url, "; Error:", error);
      }
    }

    throw new Error("All URLs failed to fetch data.");
  }

  formatAyahs(chapter: any[], editionName: string): Ayah[] {
    return chapter.map((ayah: AyahQuranApiAyah) => ({
      id: ayah.chapter,
      surah: ayah.chapter,
      ayah: ayah.verse,
      text: ayah.text,
      editionName,
    }));
  }
}

export const fetchTranslations = async (
  surah: number,
  editionName: string,
): Promise<Ayah[]> => {
  const isLocalhost = await isLocalhostReachable();
  const service = isLocalhost
    ? new LocalTranslationService()
    : new RemoteTranslationService();

  try {
    return await service.fetchAyahs(surah, editionName);
  } catch (error) {
    console.error("Local fetch failed, trying remote:", error);
    const remoteService = new RemoteTranslationService();
    return await remoteService.fetchAyahs(surah, editionName);
  }
};
