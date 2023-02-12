import { useLoaderClient } from '@tanstack/react-loaders';
import { useMatch } from '@tanstack/react-router';

import { loaderClient } from '../../routes.gen.js';

const x = loaderClient;
x.init;

export const Loader = async () => {
	const surahs = await surah.surahList();
	return { surahs };
};

export default function Index() {
	const { route } = useMatch({ from: '/surah/' });
	console.log(route);

	const data = useLoaderClient();
	console.log(data);
	// const posts = useLoaderInstance({ key: 'surahindex' });
	// console.log(posts)

	return (
		<div>
			{/* <SurahPage surahs={} /> */}
		</div>
	);
}
