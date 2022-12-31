import { Surah, SurahApi } from '@/features/index.js';
import { useParams } from '@solidjs/router';
import { createResource } from 'solid-js';

const fetchSurah = async (): Promise<Surah> => {
	const { number } = useParams<{ number: string; }>();

	const data = new SurahApi();
	const data2 = await data.getSurah(parseInt(number));
	return data2;
};

export default function Id() {
	const [surahs] = createResource(fetchSurah);

	return (
		<div>
			{surahs.loading && <p>Loading...</p>}
			{JSON.stringify(surahs())}
		</div>
	);
}
