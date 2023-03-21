import { formatEditionsData } from '@/features/index.js';
import { Edition, EditionsEnum } from '@/utils/bindings.js';
import { Err, Ok, Result } from 'ts-results';

export type EditionResult = Result<Edition[], unknown>;
abstract class EditionsAbstract {
	isTauri = window?.__TAURI_METADATA__ ? true : false;
	public abstract getEditions(editionType: EditionsEnum): Promise<EditionResult>;
	public abstract getTranslationEditions(): Promise<EditionResult>;
	public abstract getTransliterationEditions(): Promise<EditionResult>;
	public abstract getQuranTextEditions(): Promise<EditionResult>;
}

export class TauriApi extends EditionsAbstract {
	public async getEditions(editionType: EditionsEnum) {
		try {
			const { client } = await import('@/utils/rspc');
			const data = await client.query(['editions', { edition: editionType }]);
			return Ok(data);
		} catch (err) {
			return Err(err);
		}
	}
	// subclasses may override these methods to provide custom implementation
	public getTranslationEditions() {
		return this.getEditions(EditionsEnum.Translation);
	}

	// subclasses may override these methods to provide custom implementation
	public getTransliterationEditions() {
		return this.getEditions(EditionsEnum.Transliteration);
	}

	// subclasses may override these methods to provide custom implementation
	public getQuranTextEditions() {
		return this.getEditions(EditionsEnum.Quran);
	}
}

class QuranApi extends EditionsAbstract {
	public async getEditions(editionType: EditionsEnum) {
		try {
			const { $fetch } = await import('ohmyfetch');
			const data = await $fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions.min.json');
			const formattedData = formatEditionsData(data, editionType);

			return Ok(formattedData);
		} catch (err) {
			return Err(err);
		}
	}
	public getTranslationEditions() {
		return this.getEditions(EditionsEnum.Translation);
	}
	public getTransliterationEditions() {
		return this.getEditions(EditionsEnum.Transliteration);
	}
	public getQuranTextEditions() {
		return this.getEditions(EditionsEnum.Quran);
	}
}
/**
 * @param editionType - The type of the edition
 * @returns The editions of the given type
 * @description
 * - If the app is running in tauri, then use the TauriApi class to get the editions
 * - Otherwise, use the QuranApi class to get the editions
 * - returns the editions of the given type
 * @example
 * ```ts
 * const editionsApi = new EditionsApi();
 * const editions = await editionsApi.getEditions('Quran');
 * ```
 * @summary
	1. Since the code is written in typescript, we have to import the typescript bindings.
	2. The EditionsAbstract class is an abstract class that defines the interface for the EditionsApi class.
	3. The TauriApi class extends the EditionsAbstract class and implements the getEditions function.
	4. The QuranApi class extends the EditionsAbstract class and implements the getEditions function.
	5. The EditionsApi class extends the EditionsAbstract class and implements the getEditions function.
	6. The getEdition function returns the Type of the edition.
	7. The Type enum is an enum that defines the types of the quran editions.
 */
export class EditionsApi extends EditionsAbstract {
	helper = this.isTauri ? new TauriApi() : new QuranApi();
	/**
	 * Gets the editions of a given type.
	 * @param {EditionsEnum} editionType The type of editions to get.
	 * @returns The editions of the given type.
	 */
	public getEditions(editionType: EditionsEnum) {
		return this.helper.getEditions(editionType);
	}
	/**
	 * Gets the translation editions.
	 * @returns The translation editions.
	 * @example
	 * ```ts
	 * const editionsApi = new EditionsApi();
	 * const editions = await editionsApi.getTranslationEditions();
	 * ```
	 */
	public async getTranslationEditions() {
		return await this.helper.getEditions(EditionsEnum.Translation);
	}
	/**
	 * Gets the transliteration editions.
	 * @returns The transliteration editions.
	 * @example
	 * ```ts
	 * const editionsApi = new EditionsApi();
	 * const editions = await editionsApi.getTransliterationEditions();
	 * ```
	 */
	public async getTransliterationEditions() {
		return await this.helper.getEditions(EditionsEnum.Transliteration);
	}
	/**
	 * Gets the quran editions.
	 * @returns The quranText editions.
	 * @example
	 * ```ts
	 * const editionsApi = new EditionsApi();
	 * const editions = await editionsApi.getQuranEditions();
	 * ```
	 */
	public async getQuranTextEditions() {
		return await this.helper.getEditions(EditionsEnum.Quran);
	}
}
