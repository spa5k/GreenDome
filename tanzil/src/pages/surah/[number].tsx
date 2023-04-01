import { EditionViewer } from '@/features/index.js';
import { Ayah, Surahs } from '@/utils/bindings.js';
import { LoaderFn, MakeGenerics, useMatch } from '@tanstack/react-location';

export type SurahRoute = {
	surahInfo: Surahs;
	ayahs: Ayah[];
};

const mushafApi = new MushafApi();

type Route = MakeGenerics<{ LoaderData: SurahRoute; Params: { number: string; quranTextEdition: string; }; }>;

export const Loader: LoaderFn<Route> = async ({ params }) => {
	const surahInfo = await surah.surahInfoByNumber(parseInt(params.number));
	const ayahs = await mushaf.ayahsByChapter(parseInt(params.number), params.quranTextEdition);
	await getQuranTextEditions();
	await getTranslationEditions();
	await getTransliterationEditions();
	return { ayahs, surahInfo };
};

export const Pending = () => <h1>Loading...</h1>;
export const Failure = () => <h1>Something went wrong...</h1>;

export default function Surah() {
	const { data: route } = useMatch<Route>();
	const { surahInfo } = route;

	return (
		<div>
			<EditionSelectorSheet />
			{surahInfo && (
				<div>
					<h1>{surahInfo.nameSimple}</h1>
				</div>
			)}
			<EditionViewer surahInfo={surahInfo as Surahs} />
		</div>
	);
}
