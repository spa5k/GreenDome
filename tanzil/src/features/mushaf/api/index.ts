import { Ayah, Edition } from '@/utils/bindings.js';
import { Ok, Result } from 'ts-results';

export type EditionWithAyah = {
	ayahs: Ayah[];
	edition: Edition;
};

export type AyahResult = Result<EditionWithAyah, unknown>;

abstract class MushafAbstract {
	isTauri = window?.__TAURI_METADATA__ ? true : false;
	public abstract ayahsByChapter(chapter: number, edition: string): Promise<AyahResult>;
}

class MushafTauriApi extends MushafAbstract {
	public async ayahsByChapter(id: number, edition: string) {
		const { client } = await import('@/utils/rspc');

		const data = await client.query(['ayahs', { edition: edition, number: id }]);
		const editionApi = new EditionsApi();
		const editionInfo = await editionApi.getEditionInfo(edition);

		const result = {
			ayahs: data,
			edition: editionInfo.unwrap(),
		};
		return Ok(result);
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
		const editionApi = new EditionsApi();
		const editionInfo = await editionApi.getEditionInfo(edition);

		const result = {
			ayahs: formattedData,
			edition: editionInfo.unwrap(),
		};
		return Ok(result);
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
}

export const mushaf = new MushafApi();
