import { Surahs } from '@/utils/bindings.js';
import { useMatch } from '@tanstack/react-router';
const surah = new SurahApi();

export type HomeRoute = {
	surahs: Surahs[];
};

export const Loader = async () => {
	const surahs = await surah.surahList();
	return { surahs };
};

export default function Index() {
	const { route } = useMatch();

	return (
		<div>
			{/* <SurahPage surahs={} /> */}
		</div>
	);
}
