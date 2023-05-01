import { Ok, Result } from 'ts-results-es';
import { Ayah, Edition } from '../../..';
import { isTauri } from '../../../utils/isTauri';
import { EditionsApi } from '../..';

export type EditionWithAyah = {
	ayahs: Ayah[];
	edition: Edition;
};

export type AyahResult = Result<EditionWithAyah, unknown>;

abstract class MushafAbstract {
	public abstract ayahsByChapter(chapter: number, edition: string): Promise<AyahResult>;
}

class MushafTauriApi extends MushafAbstract {
	public async ayahsByChapter(id: number, edition: string) {
		const { client: clientProcedure } = await import('../../../utils/rspc');
		const client = await clientProcedure();
		const data = await client?.query(['ayahs', { edition: edition, number: id }]);
		const editionApi = new EditionsApi();
		const editionInfo = await editionApi.getEditionInfo(edition);

		const result = {
			ayahs: data,
			edition: editionInfo.unwrap(),
		};
		return Ok(result) as AyahResult;
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
	/**
	 * Return ayahs of the given chapter in the given edition.
	 *
	 * @param id chapter ID
	 * @param edition edition name
	 */
	public ayahsByChapter(id: number, edition: string) {
		const helper = isTauri ? new MushafTauriApi() : new MushafQuranApi();
		return helper.ayahsByChapter(id, edition);
	}
}
