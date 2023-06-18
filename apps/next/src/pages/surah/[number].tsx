import EnvironmentContextProvider from '@/providers/EnvironmentProvider';
import { SurahApi, Surahs } from '@quran/core';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export default function Surah() {
	// get current path
	const router = useRouter();
	const { number } = router.query as { number: string; };
	const surahs = new SurahApi();
	const { data } = useQuery<Surahs>({
		queryKey: [number],
		queryFn: () => surahs.surahInfoByNumber(parseInt(number)),
	});
	if (!data) {
		return <h1>Loading..</h1>;
	}

	return (
		<EnvironmentContextProvider>
			<main>
				<p>nice</p>
				{/* <EditionViewer surahInfo={surahInfo as Surahs} /> */}
			</main>
		</EnvironmentContextProvider>
	);
}

// export async function getStaticProps() {
// }

// export const getStaticPaths = async () => {
// 	const surahs = new SurahApi();
// 	const surahList = await surahs.surahList();

// 	const paths = surahList.map((surah) => ({
// 		params: { number: surah.id.toString() },
// 	}));

// 	// { fallback: false } means other routes should 404
// 	return { paths, fallback: false };
// };
