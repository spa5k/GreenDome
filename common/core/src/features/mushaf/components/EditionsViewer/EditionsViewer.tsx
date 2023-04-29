import { useQueries, useQuery } from '@tanstack/react-query';
import {
	Ayah,
	Edition,
	Surahs,
	useQuranTextFontSettingsStore,
	useTranslationTrackedStore,
	useTransliterationTrackedStore,
} from '../../../..';
import { AyahTextViewer, EditionWithAyah, MushafApi, QuranTextViewer } from '../..';

export const EditionViewer = ({ surahInfo }: { surahInfo: Surahs; }) => {
	const mushafApi = new MushafApi();
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
						throw new Error('Error fetching ayahs');
					}
					return data.val as EditionWithAyah;
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
				throw new Error('Error fetching ayahss');
			}
			return data.val as EditionWithAyah;
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
			{ayahs?.map((ayah: Ayah, index: string | number) => (
				<div key={ayah.ayah}>
					<QuranTextViewer ayah={ayah} edition={enabledQuranFontEdition as Edition} />
					{results.map((result) => {
						if (!result.data) return null;
						const ayah = result.data?.ayahs[index as number];
						const edition = result.data?.edition as Edition;
						const key = `${edition.name}${ayah.ayah}`;
						return (
							<AyahTextViewer
								ayah={ayah}
								edition={edition}
								key={key}
							/>
						);
					})}
				</div>
			))}
		</div>
	);
};
