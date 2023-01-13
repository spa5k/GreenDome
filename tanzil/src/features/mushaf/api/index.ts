import { Ayah } from '@/utils/bindings.js';
import { useRspcQuery } from '@/utils/rspc.js';
import { useQuery } from '@tanstack/react-query';
import { $fetch } from 'ohmyfetch';

// We can add more functions like getSurah(), getInfo()
abstract class MushafAbstract {
	isTauri = window?.__TAURI_METADATA__ ? true : false;
	public abstract useAyahs(id: number, edition: string): {
		data: Ayah[] | undefined;
		isLoading: boolean;
		error: unknown;
	};
}

class TauriApi extends MushafAbstract {
	public useAyahs(id: number, edition: string) {
		const { data, isLoading, error } = useRspcQuery(['ayahs', { edition: edition, number: id }]);
		if (!isLoading) {
			return { data, isLoading, error };
		}

		return { data, isLoading, error };
	}
}

class QuranApi extends MushafAbstract {
	public formatData(chapters: { verse: number; surah: number; text: string; }[]) {
		const ayahs: Ayah[] = [];

		for (const chapter of chapters) {
			ayahs.push({
				ayah: chapter.verse,
				surah: chapter.surah,
				text: chapter.text,
			});
		}
		return ayahs;
	}

	public useAyahs(id: number, edition = 'ara-quranindopak'): {
		data: Ayah[];
		isLoading: boolean;
		error: unknown;
	} | {
		data: undefined;
		isLoading: boolean;
		error: unknown;
	} {
		const { data, isLoading, error } = useQuery(['ayahs'], async () => {
			return await $fetch(
				`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/${edition}/${id}.json`,
			);
		});
		if (!isLoading) {
			const ayahs = data.chapter;
			const formattedData = this.formatData(ayahs);
			return { data: formattedData, isLoading, error };
		}

		return { data, isLoading, error };
	}
}

export class MushafApi extends MushafAbstract {
	helper = this.isTauri ? new TauriApi() : new QuranApi();

	public useAyahs(id: number, edition: string) {
		return this.helper.useAyahs(id, edition);
	}
}
