import { invoke } from '@tauri-apps/api/tauri';
import { Convert, SurahDB } from './types/SurahList.js';

abstract class Surah {
	public abstract getList(): Promise<SurahDB[]>;
}

class GetSurahTauriApi extends Surah {
	public async getList(): Promise<SurahDB[]> {
		const data = await invoke('get_surah');
		const surahList = Convert.toSurahList(JSON.stringify(data));
		return surahList;
	}
}

class GetSurahQuranApi extends Surah {
	public async getList(): Promise<SurahDB[]> {
		const data = await fetch('https://api.quran.com/api/v4/chapters');
		return [{} as SurahDB];
	}
}

const tauri = true;

export const getSurahList = async () => {
	let data: SurahDB[];

	if (tauri) {
		const api = new GetSurahTauriApi();
		data = await api.getList();
		console.log(data);
	} else {
		const api = new GetSurahQuranApi();
		data = await api.getList();
		console.log(data);
	}
	return data;
};
