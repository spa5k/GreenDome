import { Client } from '@rspc/client';
import { Procedures, Surahs } from '../../../index';
import { isTauri } from '../../../utils/isTauri';
import { Chapter, Surah, SurahQuranAPI } from '../index';

abstract class SurahAbstract {
	public abstract surahList(): Promise<Surahs[]>;
	public abstract surahInfoByNumber(id: number): Promise<Surahs>;
}

class SurahTauriApi extends SurahAbstract {
	public async surahList() {
		const { client: clientProcedure } = await import('../../../utils/rspc');
		const client = await clientProcedure();

		return await client?.query(['surah_list']) as Surahs[];
	}

	public async surahInfoByNumber(number: number) {
		const { client: clientProcedure } = await import('../../../utils/rspc');
		const client = await clientProcedure() as Client<Procedures>;

		return await client?.query(['surah_info', number]);
	}
}

class SurahQuranApi extends SurahAbstract {
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
			const reveleationPlace = chapter.revelation_place;
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
				reveleationPlace: reveleationPlace === 'makkah' ? 'makkah' : 'madinah',
			});
			ayahStart = ayahStart + chapter.verses_count;
		}
		return surahs;
	}
}

export class SurahApi extends SurahAbstract {
	public surahList() {
		const helper = isTauri ? new SurahTauriApi() : new SurahQuranApi();
		return helper.surahList();
	}
	public async surahInfoByNumber(id: number) {
		const helper = isTauri ? new SurahTauriApi() : new SurahQuranApi();

		return helper.surahInfoByNumber(id);
	}
}

export const surah = new SurahApi();
