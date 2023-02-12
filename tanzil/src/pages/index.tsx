export const Loader = () => async () => {
	const surah = new SurahApi();
	const surahs = await surah.surahList();
	return { surahs };
};

export const Action = () => console.log('Route action');

export const Pending = () => <div>Route pending</div>;
export const Catch = () => <div>Route error</div>;

export default function Home() {
	console.log('posts');

	return <HomePage />;
}
