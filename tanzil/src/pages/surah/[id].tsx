import { Ayah, Surahs } from '@/utils/bindings.js';
import { LoaderFn, MakeGenerics, useMatch } from '@tanstack/react-location';
import { useQuery } from 'react-query';

export type SurahRoute = {
	surahInfo: Surahs;
	ayahs: Ayah[];
};

type Route = MakeGenerics<{ LoaderData: SurahRoute; Params: { id: string; quranTextEdition: string; }; }>;

export const Loader: LoaderFn<Route> = async ({ params }) => {
	const surahInfo = await surah.surahInfoByNumber(parseInt(params.id));
	const ayahs = await mushaf.ayahsByChapter(parseInt(params.id), params.quranTextEdition);
	return { ayahs, surahInfo };
};

export const Pending = () => <h1>Loading...</h1>;
export const Failure = () => <h1>Something went wrong...</h1>;

export default function Surah() {
	const { data: route } = useMatch<Route>();
	const { surahInfo } = route;
	const { fetchQuranText, changeQuranTextEdition, quranTextEdition } = surahStore();
	const { data: queryData, refetch } = useQuery<Ayah[]>('quran_text', async () => {
		return await fetchQuranText(Number(route.surahInfo?.id));
	});

	const changeEdition = () => {
		if (quranTextEdition === 'ara-quranuthmanihaf') {
			changeQuranTextEdition('eng-muhammadsarwar');
		} else {
			changeQuranTextEdition('ara-quranuthmanihaf');
		}
		refetch();
	};

	return (
		<div>
			<button onClick={changeEdition}>Change Edition</button>
			<h1>Post @ {surahInfo?.nameArabic}</h1>
			<h1>{quranTextEdition}</h1>
			{queryData?.map((ayah) => <p key={ayah.ayah} style={{ fontFamily: 'Uthmanic' }} className='text-lg'>{ayah.text}</p>)}
		</div>
	);
}
