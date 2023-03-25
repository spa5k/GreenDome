import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/Sheet/sheet.js';
import { Ayah, Surahs } from '@/utils/bindings.js';
import { LoaderFn, MakeGenerics, useMatch } from '@tanstack/react-location';
import { useQuery } from '@tanstack/react-query';

export type SurahRoute = {
	surahInfo: Surahs;
	ayahs: Ayah[];
};

const mushafApi = new MushafApi();

type Route = MakeGenerics<{ LoaderData: SurahRoute; Params: { id: string; quranTextEdition: string; }; }>;

export const Loader: LoaderFn<Route> = async ({ params }) => {
	const surahInfo = await surah.surahInfoByNumber(parseInt(params.id));
	const ayahs = await mushaf.ayahsByChapter(parseInt(params.id), params.quranTextEdition);
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

	const { enabledQuranFontEdition } = useQuranTrackedStore();
	const { enabledTranslations } = useTranslationTrackedStore();
	const { enabledTransliterations } = useTransliterationTrackedStore();

	const { data: ayahs, isLoading: isAyahsLoading } = useQuery(
		['ayahs', surahInfo?.id, enabledQuranFontEdition],
		() => mushafApi.ayahsByChapter(surahInfo?.id as number, enabledQuranFontEdition?.name as string),
		{
			enabled: !!surahInfo,
		},
	);

	return (
		<div>
			<Sheet>
				<SheetTrigger>
					OPEN
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Select Quran Font, Translations and Transliteraions</SheetTitle>
						<SheetDescription>
							{enabledTranslations.map((translation) => (
								<div key={translation.id}>
									<h1>{translation.author}</h1>
								</div>
							))}
							{enabledTransliterations.map((transliteration) => (
								<div key={transliteration.id}>
									<h1>{transliteration.author}</h1>
								</div>
							))}
							{enabledQuranFontEdition && (
								<div>
									<h1>{enabledQuranFontEdition.author}</h1>
								</div>
							)}
						</SheetDescription>
					</SheetHeader>
					<Command className='w-full'>
						<CommandInput placeholder='Type a command or search...' />
						<CommandList className='h-full max-h-full'>
							<CommandEmpty>No results found.</CommandEmpty>
							<QuranTextEditionSelector />
							<TranslationsTextEditionSelector />
							<TransliterationsTextEditionSelector />
						</CommandList>
					</Command>
				</SheetContent>
			</Sheet>

			{surahInfo && (
				<div>
					<h1>{surahInfo.nameSimple}</h1>
				</div>
			)}

			{isAyahsLoading && <h1>Loading...</h1>}
			{ayahs?.map((ayah) => (
				<div key={ayah.ayah}>
					<h1>{ayah.text}</h1>
				</div>
			))}
		</div>
	);
}
