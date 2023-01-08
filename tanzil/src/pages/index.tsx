const surah = new SurahApi();

const Index = () => {
	const { data, error, isLoading } = surah.useSurahList();

	const theme = () => ({
		width: Theme.theme.get(),
	});

	if (isLoading) {
		return <p>loading..</p>;
	}

	if (error) {
		return <p>error..</p>;
	}

	return (
		<div className={`bg-primary text-text ${theme} `}>
			<h2 className='text-text text-4xl font-bold'>
				THEME
			</h2>

			<button
				onClick={() => {
					Theme.theme.set('rashidun');
				}}
			>
				Change theme to rashidun
			</button>
			<button
				onClick={() => {
					Theme.theme.set('default');
				}}
			>
				Revert back to default
			</button>
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
