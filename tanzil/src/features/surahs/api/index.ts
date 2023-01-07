import { Ayah } from '@/utils/bindings.js';
import { useRspcQuery } from '@/utils/rspc.js';
import { useQuery } from '@tanstack/react-query';
import { $fetch } from 'ohmyfetch';
import { Chapter, ConvertSurah, Surah, SurahQuranAPI } from '../types/index.js';

// We can add more functions like getSurah(), getInfo()
abstract class SurahAbstract {
	isTauri = window?.__TAURI_METADATA__ ? true : false;
	public abstract useSurahList(): {
		data: Surah[] | undefined;
		isLoading: boolean;
		error: unknown;
	};
	public abstract useSurahByNumber(id: number): {
		data: Surah | undefined;
		isLoading: boolean;
		error: unknown;
	};

	public abstract useAyahs(id: number): {
		data: Ayah[] | undefined;
		isLoading: boolean;
		error: unknown;
	};
}

class TauriApi extends SurahAbstract {
	public useSurahList() {
		const { data, isLoading, error } = useRspcQuery(['surah_list']);

		if (!isLoading) {
			const fixedData = this.formatData(JSON.stringify(data));
			return { data: fixedData, isLoading, error };
		}
		return { data, isLoading, error };
	}

	public useSurahByNumber(id: number) {
		const { data, isLoading, error } = useRspcQuery(['surah_info', id]);
		if (!isLoading) {
			const tempSurah = [{ ...data }];
			const res = ConvertSurah.toSurah(JSON.stringify(tempSurah))[0];
			return { data: res, isLoading, error };
		}
		return { data, isLoading, error };
	}

	formatData(data: string) {
		return ConvertSurah.toSurah(data);
	}

	public useAyahs(id: number) {
		const { data, isLoading, error } = useRspcQuery(['ayahs', id]);
		if (!isLoading) {
			const tempData = data as Ayah[];
			return { data: tempData, isLoading, error };
		}

		return { data, isLoading, error };
	}
}

class QuranApi extends SurahAbstract {
	public useSurahList() {
		const { data, isLoading, error } = useQuery(['surah_info'], async () => {
			return await $fetch('https://api.quran.com/api/v4/chapters');
		});

		if (!isLoading) {
			const { chapters } = data as SurahQuranAPI;
			const formattedData = this.formatData(chapters);
			return { data: formattedData, isLoading, error };
		}
		return { data, isLoading, error };
	}

	public useSurahByNumber(id: number) {
		const { data, isLoading, error } = useQuery(['surah_info'], async () => {
			return await $fetch(
				`https://api.quran.com/api/v4/chapters/${id}?language=en`,
			);
		});
		if (!isLoading) {
			const { chapter }: { chapter: Chapter; } = data;
			const formattedData = this.formatData([chapter])[0];
			return { data: formattedData, isLoading, error };
		}
		return { data, isLoading, error };
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

	public useAyahs(id: number) {
		const { data, isLoading, error } = useRspcQuery(['ayahs', id]);
		if (!isLoading) {
			const tempData = data as Ayah[];
			return { data: tempData, isLoading, error };
		}

		return { data, isLoading, error };
	}
}

export class SurahApi extends SurahAbstract {
	helper = this.isTauri ? new TauriApi() : new QuranApi();
	public useSurahList() {
		return this.helper.useSurahList();
	}
	public useSurahByNumber(id: number) {
		return this.helper.useSurahByNumber(id);
	}

	public useAyahs(id: number) {
		return this.helper.useAyahs(id);
	}
}
