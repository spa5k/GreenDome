import { Surah, SurahApi } from '@/features/index.js';
import { Link } from '@solidjs/router';
import { createResource, For } from 'solid-js';

const fetchSurahs = async (): Promise<Surah[]> => {
	const data = new SurahApi();
	const data2 = await data.getSurahs();
	return data2;
};

const Index = () => {
	const [surahs] = createResource<Surah[]>(fetchSurahs);

	return (
		<div>
			{surahs.loading && <p>Loading...</p>}

			<For each={surahs()} fallback={<div>Loading...</div>}>
				{(item) => {
					return (
						<Link href={`surah/${item.id}`}>
							<div>
								<p>{item.nameSimple}</p>
								<p>{item.nameArabic}</p>
							</div>
						</Link>
					);
				}}
			</For>
			<p class='text-4xl text-green-700 text-center py-20'>Bismillah!</p>
		</div>
	);
};

export default Index;
