import { Ayah } from '@/utils/bindings.js';

// We can add more functions like getSurah(), getInfo()
abstract class MushafAbstract {
	isTauri = window?.__TAURI_METADATA__ ? true : false;
	public abstract ayahsByChapter(chapter: number, edition: string): Promise<Ayah[]>;
}

class MushafTauriApi extends MushafAbstract {
	public async ayahsByChapter(id: number, edition: string) {
		const { client } = await import('@/utils/rspc');

		const data = await client.query(['ayahs', { edition: edition, number: id }]);
		return data;
	}
}

class MushafQuranApi extends MushafAbstract {
	public async ayahsByChapter(id: number, edition = 'ara-quranindopak') {
		const { $fetch } = await import('ohmyfetch');

		const data = await $fetch(
			`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/${edition}/${id}.json`,
		);
		const ayahs = data.chapter;
		const formattedData = this.formatData(ayahs);
		return formattedData;
	}

	private formatData(chapters: { verse: number; surah: number; text: string; }[]) {
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
}

export class MushafApi extends MushafAbstract {
	helper = this.isTauri ? new MushafTauriApi() : new MushafQuranApi();

	public ayahsByChapter(id: number, edition: string) {
		return this.helper.ayahsByChapter(id, edition);
	}
}

export const mushaf = new MushafApi();
