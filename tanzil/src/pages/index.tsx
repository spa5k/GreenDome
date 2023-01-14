import { useSelector } from '@legendapp/state/react';

const surah = new SurahApi();

const Index = () => {
	const { data, error, isLoading } = surah.useSurahList();

	const selectedTheme = useSelector(() => Theme.theme.get());

	if (isLoading) {
		return <p>loading..</p>;
	}

	if (error) {
		return <p>error..</p>;
	}

	return (
		<div className={`bg-primary text-body ${selectedTheme} `}>
			<div className=''>
				{data?.map((d) => {
					return (
						<Link to={`/surah/${d.id}`} key={d.id}>
							<p>{d.id}</p>
							<p>{d.nameSimple}</p>
						</Link>
					);
				})}
			</div>
			<HomePage />
		</div>
	);
};

export default Index;
