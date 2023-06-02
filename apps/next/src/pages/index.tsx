import EnvironmentContextProvider from '@/providers/EnvironmentProvider';
import { SurahApi, SurahPage } from '@quran/core';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

export default function Home() {
	const surahs = new SurahApi();
	const { data } = useQuery({ queryKey: ['surahs'], queryFn: surahs.surahList });
	return (
		<EnvironmentContextProvider>
			<main>
				<SurahPage surahs={data} />
			</main>
		</EnvironmentContextProvider>
	);
}

export async function getStaticProps() {
	const queryClient = new QueryClient();
	const surahs = new SurahApi();

	await queryClient.prefetchQuery(['surahs'], surahs.surahList);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}
