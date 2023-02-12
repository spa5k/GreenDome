import { Surahs } from '@/utils/bindings.js';
import { useMatch } from '@tanstack/react-router';
// import { LoaderFn, MakeGenerics, useMatch } from '@tanstack/react-location';
const surah = new SurahApi();

export type HomeRoute = {
	surahs: Surahs[];
};

// type Route = MakeGenerics<{ LoaderData: HomeRoute; }>;

export const Loader = async () => {
	const surahs = await surah.surahList();
	return { surahs };
};

export default function Index() {
	const { state } = useMatch({ from: '/' });

	return <HomePage />;
}
