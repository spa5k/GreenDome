import { Surahs } from '@/utils/bindings.js';
import { LoaderFn, MakeGenerics } from '@tanstack/react-location';
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
	return <HomePage />;
}
