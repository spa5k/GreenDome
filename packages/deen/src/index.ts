import { invoke } from '@tauri-apps/api';
import { SurahList } from './types/SurahList.js';

abstract class Surah {
	public abstract getList(): Promise<SurahList>;
}

class GetSurahTauriApi extends Surah {
	public async getList(): Promise<SurahList> {
		return {
			ayahEnd: 1,
		} as SurahList;
	}
}

class GetSurahQuranApi extends Surah {
	public async getList(): Promise<SurahList> {
		const data = await fetch('https://api.quran.com/api/v4/chapters');

		return {
			ayahEnd: 2,
		} as SurahList;
	}
}

const tauri = true;

export const getSurahList = async () => {
	let data: any;
	invoke('surah_list').then((message: any) => console.log(message));

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
