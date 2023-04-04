import { Ayah, Edition, Surahs } from '@/utils/bindings.js';
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
				queryFn: async () => {
					const data = await mushafApi.ayahsByChapter(surahInfo.id, edition.name);
					if (data.err) {
						throw new Error(data.err);
					}
					return data.val;
				},
				enabled: !!surahInfo,
				staleTime: Infinity, // add this to cache data indefinitely
			})),
		},
	);

	const { data, isLoading } = useQuery(
		['ayahs', surahInfo.id, enabledQuranFontEdition],
		async () => {
			const data = await mushafApi.ayahsByChapter(surahInfo.id, enabledQuranFontEdition?.name as string);
			if (data.err) {
				throw new Error(data.err);
			}
			return data.val;
		},
		{
			enabled: !!surahInfo,
		},
	);

	if (results.some((result) => result.isLoading) || isLoading) {
		return <h1>Loading...</h1>;
	}

	const ayahs = data?.ayahs;

	return (
		<div className='flex flex-col space-y-4'>
			{ayahs?.map((ayah, index) => (
				<div key={ayah.ayah}>
					<QuranTextViewer ayah={ayah} edition={enabledQuranFontEdition as Edition} />
					{results.map((result) => (
						<AyahTextViewer
							key={`${result.data?.edition.name}${result.data?.ayahs[index].ayah}`}
							ayah={result.data?.ayahs[index] as Ayah}
							edition={result.data?.edition as Edition}
						/>
					))}
				</div>
			))}
		</div>
	);
};
