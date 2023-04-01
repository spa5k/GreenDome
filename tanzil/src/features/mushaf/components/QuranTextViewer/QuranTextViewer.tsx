import { Edition, Surahs } from '@/utils/bindings.js';
import { useQuery } from '@tanstack/react-query';

const mushafApi = new MushafApi();

export const QuranTextViewer = ({ quranFontEdition, surahInfo }: { quranFontEdition: Edition; surahInfo: Surahs; }) => {
	const { data, isLoading } = useQuery(
		['ayahs', surahInfo.id, quranFontEdition],
		() => mushafApi.ayahsByChapter(surahInfo.id, quranFontEdition.name),
		{
			enabled: !!surahInfo,
		},
	);
	if (isLoading) {
		return <h1>Loading...</h1>;
	}

	return (
		<div>
			{data?.map((ayah) => (
				<div key={ayah.ayah}>
					<h1>{ayah.text}</h1>
				</div>
			))}
		</div>
	);
};
