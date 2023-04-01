import { Edition, Surahs } from '@/utils/bindings.js';
import { useQueries, useQuery } from '@tanstack/react-query';
const mushafApi = new MushafApi();

export const EditionViewer = ({ surahInfo }: { surahInfo: Surahs; }) => {
	const { enabledQuranFontEdition } = useQuranTextFontSettingsStore();
	const { enabledTranslations } = useTranslationTrackedStore();
	const { enabledTransliterations } = useTransliterationTrackedStore();

	const combinedEditions = [
		...enabledTranslations,
		...enabledTransliterations,
	] as Edition[];

	const results = useQueries(
		{
			queries: combinedEditions.map((edition) => ({
				queryKey: ['ayahs', surahInfo.id, edition.name],
				queryFn: () => mushafApi.ayahsByChapter(surahInfo.id, edition.name),
				enabled: !!surahInfo,
				staleTime: Infinity, // add this to cache data indefinitely
			})),
		},
	);

	const { data, isLoading } = useQuery(
		['ayahs', surahInfo.id, enabledQuranFontEdition],
		() => mushafApi.ayahsByChapter(surahInfo.id as number, enabledQuranFontEdition?.name as string),
		{
			enabled: !!surahInfo,
		},
	);

	if (results.some((result) => result.isLoading) || isLoading) {
		return <h1>Loading...</h1>;
	}

	return (
		<div className='flex flex-col space-y-4'>
			{data?.map((ayah, index) => (
				<div key={ayah.ayah}>
					<h1>{ayah.text}</h1>
					{results.map((result) => (
						<div key={result.data?.[index].ayah}>
							<h1>{result.data?.[index].text}</h1>
						</div>
					))}
				</div>
			))}
		</div>
	);
};
