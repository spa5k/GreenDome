import { Surahs } from '@/utils/bindings.js';
import { Chapter, Surah, SurahQuranAPI } from '../types/index.js';

// We can add more functions like getSurah(), getInfo()
abstract class SurahAbstract {
	isTauri = window?.__TAURI_METADATA__ ? true : false;
	public abstract surahList(): Promise<Surahs[]>;
	public abstract surahInfoByNumber(id: number): Promise<Surahs>;
}

class TauriApi extends SurahAbstract {
	public async surahList() {
		const { client } = await import('@/utils/rspc');

		return await client.query(['surah_list']);
	}

	public async surahInfoByNumber(number: number) {
		const { client } = await import('@/utils/rspc');

		return await client.query(['surah_info', number]);
	}
}

class QuranApi extends SurahAbstract {
	public async surahList(): Promise<Surahs[]> {
		const { $fetch } = await import('ohmyfetch');

		const data: SurahQuranAPI = await $fetch(
			'https://api.quran.com/api/v4/chapters',
		);
		const formattedData: Surahs[] = this.formatData(data.chapters);
		return formattedData;
	}

	public async surahInfoByNumber(id: number) {
		const { $fetch } = await import('ohmyfetch');

		const data = await $fetch(
			`https://api.quran.com/api/v4/chapters/${id}?language=en`,
		);

		const { chapter }: { chapter: Chapter; } = data;
		const formattedData: Surahs = this.formatData([chapter])[0];
		return formattedData;
	}

	public formatData(chapters: Chapter[]): Surah[] {
		const surahs: Surah[] = [];
		let ayahStart = 0;

		for (const chapter of chapters) {
			surahs.push({
				ayahEnd: chapter.verses_count,
				ayahStart,
				bismillahPre: chapter.bismillah_pre ? 'true' : 'false',
				id: chapter.id,
				nameArabic: chapter.name_arabic,
				nameComplex: chapter.name_complex,
				nameSimple: chapter.name_simple,
				pageEnd: chapter.pages[1],
				pageStart: chapter.pages[0],
				revelationOrder: chapter.revelation_order,
			});
			ayahStart = ayahStart + chapter.verses_count;
		}
		return surahs;
	}
}

export class SurahApi extends SurahAbstract {
	helper = this.isTauri ? new TauriApi() : new QuranApi();
	public surahList() {
		return this.helper.surahList();
	}
	public async surahInfoByNumber(id: number) {
		return this.helper.surahInfoByNumber(id);
	}
}

export const surah = new SurahApi();
