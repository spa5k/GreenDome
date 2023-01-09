const surah = new SurahApi();

const Component = () => {
	const { id } = useParams();
	const { data, isLoading, error } = surah.useSurahByNumber(parseInt(String(id)));
	const { data: ayahs } = surah.useAyahs(parseInt(String(id)));

	if (isLoading) {
		return <p>loading..</p>;
	}

	if (error) {
		return <p>error..</p>;
	}
	return (
		<div>
			<p>
				<Link to='/'>
					Home
				</Link>
			</p>
			<p>blog/[id].tsx: {id}</p>;
			<p>{data?.nameArabic}</p>

			<p>{data?.nameSimple}</p>
			{ayahs?.map((ayah) => {
				return (
					<div key={ayah.ayah}>
						<p>
							{ayah.ayah}
						</p>
						<p>{ayah.unicode}</p>
					</div>
				);
			})}
		</div>
	);
};

export default Component;
