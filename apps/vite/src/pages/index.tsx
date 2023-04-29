import { SurahApi, SurahPage, Surahs } from '@quran/core';
import { QueryClient } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';

interface LoaderData {
	surahList: Surahs[];
}

export const Loader = async (): Promise<LoaderData> => {
	const surahs = new SurahApi();
	const surahList = await surahs.surahList();
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(['surahs'], surahs.surahList);

	return { surahList };
};

export default function Home() {
	const { surahList } = useLoaderData() as LoaderData;
	return (
		<div>
			<SurahPage surahs={surahList} />
		</div>
	);
}
