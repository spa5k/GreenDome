import { Ayah } from '@/utils/bindings.js';

abstract class MushafAbstract {
	isTauri = window?.__TAURI_METADATA__ ? true : false;
	public abstract ayahsByChapter(chapter: number, edition: string): Promise<Ayah[]>;
	public abstract translationsByChapter(chapter: number, edition: string[]): Promise<Ayah[][]>;
}

class MushafTauriApi extends MushafAbstract {
	public async ayahsByChapter(id: number, edition: string) {
		const { client } = await import('@/utils/rspc');

		const data = await client.query(['ayahs', { edition: edition, number: id }]);
		return data;
	}
	public async translationsByChapter(id: number, edition: string[]) {
		const { client } = await import('@/utils/rspc');
		// fetch all translations
		// Go through a loop and fetch all translations
		const translations = [];
		for (const ed of edition) {
			const data = await client.query(['ayahs', { edition: ed, number: id }]);
			translations.push(data);
		}
		return translations;
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

	public async translationsByChapter(id: number, edition: string[]) {
		const { $fetch } = await import('ohmyfetch');

		const translations = [];
		for (const ed of edition) {
			const data = await $fetch(
				`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/${ed}/${id}.json`,
			);
			const ayahs = data.chapter;
			const formattedData = this.formatData(ayahs);
			translations.push(formattedData);
		}
		return translations;
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

	/**
	 * Return ayahs of the given chapter in the given edition.
	 *
	 * @param id chapter ID
	 * @param edition edition name
	 */
	public ayahsByChapter(id: number, edition: string) {
		return this.helper.ayahsByChapter(id, edition);
	}

	/**
	 * Return translations of the given chapter in the given edition.
	 * @param id chapter ID
	 * @param edition edition name
	 * @returns Ayah[][] array of ayahs
	 * @example
	 */
	public translationsByChapter(id: number, edition: string[]) {
		return this.helper.translationsByChapter(id, edition);
	}
}

export const mushaf = new MushafApi();
