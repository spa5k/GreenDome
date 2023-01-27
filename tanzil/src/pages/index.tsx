import { Surahs } from '@/utils/bindings.js';
import { LoaderFn, MakeGenerics, useMatch } from '@tanstack/react-location';
const surah = new SurahApi();

export type HomeRoute = {
	surahs: Surahs[];
};

type Route = MakeGenerics<{ LoaderData: HomeRoute; }>;

export const Loader: LoaderFn<Route> = async () => {
	const surahs = await surah.surahList();
	return { surahs };
};

export default function Index() {
	const { data } = useMatch<Route>();
	console.log('data', data);

	return <HomePage />;
}
