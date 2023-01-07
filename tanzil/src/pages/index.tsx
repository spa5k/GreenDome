const surah = new SurahApi();

const Index = () => {
	const { data, error, isLoading } = surah.useSurahList();

	if (isLoading) {
		return <p>loading..</p>;
	}

	if (error) {
		return <p>error..</p>;
	}

	return (
		<div>
			<div>
				{data?.map((d) => {
					return (
						<Link to={`/surah/${d.id}`} key={d.id}>
							<p>{d.id}</p>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default Index;
