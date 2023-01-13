import { useSelector } from '@legendapp/state/react';

const surah = new SurahApi();
const edition = new EditionsApi();

const Index = () => {
	const { data, error, isLoading } = surah.useSurahList();
	const { data: editions } = edition.useEditionsList('Translation');

	const isSelected = useSelector(() => Theme.theme.get());

	if (isLoading) {
		return <p>loading..</p>;
	}

	if (error) {
		return <p>error..</p>;
	}
	console.log(editions);

	return (
		<div className={`bg-primary text-text ${isSelected} `}>
			<h2 className='text-text text-4xl font-bold'>THEME</h2>

			<div className='flex justify-center'>
				<div className='mb-3 xl:w-96'>
					<select
						className='form-select appearance-none'
						aria-label='Default select example'
					>
						<option selected value={'aar-sheikhmahmoudab'}>
							Open this select menu
						</option>
						{editions?.map((edition) => (
							<option value={edition.name} key={edition.id}>
								{edition.author}
							</option>
						))}
					</select>
				</div>
			</div>

			<button
				className='p-5 bg-white text-red-500 m-5'
				onClick={() => Theme.theme.set('rashidun')}
			>
				Change theme to rashidun
			</button>
			<button
				className='p-5 bg-white text-red-500'
				onClick={() => Theme.theme.set('default')}
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
