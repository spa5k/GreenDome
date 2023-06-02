import { useQuery } from '@tanstack/react-query';
import { EditionWithAyah, MushafApi, Surahs, useQuranTextFontSettingsStore } from '../../..';

export const MushafViewer = ({ surahInfo }: { surahInfo: Surahs; }) => {
	const mushafApi = new MushafApi();
	const { enabledQuranFontEdition } = useQuranTextFontSettingsStore();

	const results = useQuery(
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
			staleTime: Infinity,
		},
	);

	if (results.isLoading) {
		return <h1>Loading...</h1>;
	}

	return (
		<div>
			<h1>{surahInfo.nameSimple}</h1>
			{JSON.stringify(results.data?.ayahs, null, 2)}
		</div>
	);
};
