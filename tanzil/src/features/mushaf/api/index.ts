import { Ayah } from '@/utils/bindings.js';
import { client } from '@/utils/rspc.js';
import { $fetch } from 'ohmyfetch';

// We can add more functions like getSurah(), getInfo()
abstract class MushafAbstract {
	isTauri = window?.__TAURI_METADATA__ ? true : false;
	public abstract ayahsByChapter(chapter: number, edition: string): Promise<Ayah[]>;
}

class TauriApi extends MushafAbstract {
	public async ayahsByChapter(id: number, edition: string) {
		const data = await client.query(['ayahs', { edition: edition, number: id }]);
		return data;
	}
}

class QuranApi extends MushafAbstract {
	public async ayahsByChapter(id: number, edition = 'ara-quranindopak') {
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
	helper = this.isTauri ? new TauriApi() : new QuranApi();

	public ayahsByChapter(id: number, edition: string) {
		return this.helper.ayahsByChapter(id, edition);
	}
}
