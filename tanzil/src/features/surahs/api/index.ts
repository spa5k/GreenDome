import { invoke } from '@tauri-apps/api';
import { Chapter, ConvertSurah, Surah, SurahQuranAPI } from '../types/index.js';

// We can add more functions like getSurah(), getInfo()
abstract class SurahAbstract {
	isTauri = window?.__TAURI_METADATA__ ? true : false;
	public abstract getSurahs(): Promise<Surah[]>;
	public abstract getSurah(id: number): Promise<Surah>;
}

class TauriApi extends SurahAbstract {
	public async getSurahs(): Promise<Surah[]> {
		const data = await invoke('get_surahs');
		const fixedData = this.formatData(JSON.stringify(data));
		return fixedData;
	}

	public async getSurah(id: number): Promise<Surah> {
		const data: object = await invoke('get_surah', { number: id });
		const tempSurah = [{ ...data }];
		return ConvertSurah.toSurah(JSON.stringify(tempSurah))[0];
	}

	formatData(data: string) {
		return ConvertSurah.toSurah(data);
	}
}

class QuranApi extends SurahAbstract {
	public async getSurahs(): Promise<Surah[]> {
		console.log('here');
		const data: SurahQuranAPI = await (await fetch('https://api.quran.com/api/v4/chapters')).json();
		const { chapters } = data;
		return this.formatData(chapters);
	}

	public async getSurah(id: number): Promise<Surah> {
		const data = await (await fetch(`https://api.quran.com/api/v4/chapters/${id}?language=en`)).json();
		const { chapter }: { chapter: Chapter; } = data;
		return this.formatData([chapter])[0];
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

	public async getSurahs() {
		return await this.helper.getSurahs();
	}
	public async getSurah(id: number) {
		return await this.helper.getSurah(id);
	}
}
