import { Ayah, Surahs } from '@/utils/bindings.js';
import { LoaderFn, MakeGenerics, useMatch } from '@tanstack/react-location';
const surah = new SurahApi();
const mushaf = new MushafApi();

export type Mushaf = {
	surahInfo: Surahs;
	ayahs: Ayah[];
};

type Route = MakeGenerics<{ LoaderData: Mushaf; Params: { id: string; edition: string; }; }>;

export const Loader: LoaderFn<Route> = async ({ params }) => {
	const surahInfo = await surah.surahInfoByNumber(parseInt(params.id));
	const ayahs = await mushaf.ayahsByChapter(parseInt(params.id), 'ara-quranacademy');
	return { ayahs, surahInfo };
};

export const Pending = () => <h1>Loading...</h1>;
export const Failure = () => <h1>Something went wrong...</h1>;

export default function Surah() {
	const { data } = useMatch<Route>();

	return (
		<>
			<h1>Post @ {data.surahInfo?.nameArabic}</h1>

			<code>
				Loader data
				<pre>{JSON.stringify(data, null, 2)}</pre>
			</code>
		</>
	);
}
