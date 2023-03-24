import { Ayah, Surahs } from '@/utils/bindings.js';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
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
	const [open, setOpen] = useState(false);

	const { enabledQuranFontEdition } = useQuranTrackedStore();
	const { enabledTranslations } = useTranslationTrackedStore();
	const { enabledTransliterations } = useTransliterationTrackedStore();

	const { data: ayahs, isLoading: isAyahsLoading } = useQuery(
		['ayahs', surahInfo?.id, enabledQuranFontEdition],
		() => mushafApi.ayahsByChapter(surahInfo?.id as number, enabledQuranFontEdition),
		{
			enabled: !!surahInfo,
		},
	);

	return (
		<div>
			<Command className='dark:border-slate- w-64 rounded-lg  border border-slate-100 shadow-md'>
				<Popover>
					<PopoverTrigger
						className={clsx(
							'relative h-9 w-full justify-start text-sm text-slate-500 dark:text-slate-400 sm:pr-12 md:w-40 lg:w-64',
						)}
					>
						<span className='hidden lg:inline-flex'>Search documentation...</span>
						<kbd className='text-text border-border bg-primary pointer-events-none absolute top-2 right-1.5 hidden h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
							<span className='text-xs'>⌘</span>K
						</kbd>
					</PopoverTrigger>
					<PopoverContent>
						<CommandInput placeholder='Type a command or search...' />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							<QuranTextEditionSelector />
							<TranslationsTextEditionSelector />
							<TransliterationsTextEditionSelector />
						</CommandList>
					</PopoverContent>
				</Popover>
			</Command>
			{surahInfo && (
				<div>
					<h1>{surahInfo.nameSimple}</h1>
				</div>
			)}

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
					<h1>{enabledQuranFontEdition}</h1>
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
