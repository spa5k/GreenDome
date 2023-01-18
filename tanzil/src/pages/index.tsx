import { HomePage } from '@/screens/homepage.js';
import { Surahs } from '@/utils/bindings.js';
import { Link, LoaderFn, MakeGenerics, useMatch } from '@tanstack/react-location';
const surah = new SurahApi();

export type HomeRoute = {
	surahs: Surahs[];
};

type Route = MakeGenerics<{ LoaderData: HomeRoute; }>;

export const Loader: LoaderFn<Route> = async () => {
	const surahs = await surah.surahList();
	return { surahs };
};

export default function Index() {
	const { data } = useMatch<Route>();

	return (
		<div>
			<HomePage />
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
