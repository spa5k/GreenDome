import { Layout } from '@/screens/homepage.js';
import { Surahs } from '@/utils/bindings.js';
import { Link, LoaderFn, MakeGenerics, useMatch } from '@tanstack/react-location';
const surah = new SurahApi();

export type Home = {
	surahs: Surahs[];
};

type Route = MakeGenerics<{ LoaderData: Home; }>;

export const Loader: LoaderFn<Route> = async () => {
	const surahs = await surah.surahList();
	return { surahs };
};

export default function Home() {
	const { data } = useMatch<Route>();

	return (
		<div>
			<Layout />
			{data.surahs?.map((s) => {
				return (
					<Link to={`/surah/${s.id}`} key={s.nameArabic}>
						<p>
							{s.nameSimple} - {s.id}
						</p>
					</Link>
				);
			})}
		</div>
	);
}
