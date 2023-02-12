import { useLoaderInstance } from '@tanstack/react-loaders';
import { useMatch } from '@tanstack/react-router';

export const Loader = async ({ id }: { id: number; }) => {
	const surahInfo = await surah.surahInfoByNumber(1);
	const ayahs = await mushaf.ayahsByChapter(id, 'ara-quranindopak');
	return { surahInfo, ayahs };
};

export default function Id() {
	const { params } = useMatch({ from: '/surah/$id' });
	const data = useLoaderInstance({ key: 'surahid' });
	console.log(data);
	return <h1>{params.id}</h1>;
}
