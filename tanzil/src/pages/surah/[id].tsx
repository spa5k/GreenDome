import { surahStore } from '@/stores/surahStore.js';
import { Ayah, Surahs } from '@/utils/bindings.js';
import { LoaderFn, MakeGenerics, useMatch } from '@tanstack/react-location';
import { useQuery } from 'react-query';

const surah = new SurahApi();
const mushaf = new MushafApi();

export type SurahRoute = {
	surahInfo: Surahs;
	ayahs: Ayah[];
};

type Route = MakeGenerics<{ LoaderData: SurahRoute; Params: { id: string; quranTextEdition: string; }; }>;

export const Loader: LoaderFn<Route> = async ({ params }) => {
	console.log(params);
	const surahInfo = await surah.surahInfoByNumber(parseInt(params.id));
	const ayahs = await mushaf.ayahsByChapter(parseInt(params.id), params.quranTextEdition);
	return { ayahs, surahInfo };
};

export const Pending = () => <h1>Loading...</h1>;
export const Failure = () => <h1>Something went wrong...</h1>;

// const getQuranTxt = async (number: number) => {
// 	return await surahStore().fetchQuranText(number);
// };

export default function Surah() {
	const { data: route } = useMatch<Route>();
	const { surahInfo } = route;
	const quranState = surahStore();
	const { data: queryData, refetch } = useQuery<Ayah[]>('todos', async () => {
		return await quranState.fetchQuranText(Number(route.surahInfo?.id));
	});

	refetch();

	const changeEdition = () => {
		if (quranState.quranTextEdition === 'ara-quranuthmanihaf') {
			quranState.changeQuranTextEdition('eng-muhammadsarwar');
		} else {
			quranState.changeQuranTextEdition('ara-quranuthmanihaf');
		}
	};

	return (
		<div>
			<button onClick={changeEdition}>Change Edition</button>
			<h1>Post @ {surahInfo?.nameArabic}</h1>
			<h1>{quranState.quranTextEdition}</h1>
			{queryData?.map((ayah) => <p key={ayah.ayah} style={{ fontFamily: 'Uthmanic' }} className='text-lg'>{ayah.text}</p>)}
		</div>
	);
}
