import { Icon } from '@iconify/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@quran/elements';
import { useContext } from 'react';
import { EnvironmentContext, Surahs } from '..';

export const SurahPage = ({ surahs }: { surahs: Surahs[] | undefined; }) => {
	const { Link } = useContext(EnvironmentContext);

	return (
		<div className='container mx-auto mt-4 h-full min-h-screen'>
			<div className='flex flex-wrap p-7 transition-all duration-300'>
				{surahs?.map((surah) => {
					return (
						<div className='m-4 w-[250px]' key={surah.id}>
							<Link
								href={`/surah/${surah.id}`}
								key={surah.id}
								className='group relative h-20 sm:h-28 lg:h-32'
							>
								<Card>
									<CardHeader>
										<CardTitle>{surah.nameSimple}</CardTitle>
										<CardDescription>{surah.nameArabic}</CardDescription>
									</CardHeader>
									<CardContent>
										<div className='mt-4 flex space-x-2 text-xl font-medium sm:text-2xl'>
											<h2 className=''>
												{surah.id}. {surah.nameSimple}
											</h2>
										</div>
									</CardContent>
									<CardFooter className='flex justify-between'>
										{surah.reveleationPlace === 'makkah'
											? <Icon icon='fluent-emoji-high-contrast:kaaba' className='h-10 w-10 sm:h-8 sm:w-8' />
											: <Icon icon='fa6-solid:mosque' className='h-10 w-10 sm:h-8 sm:w-8' />}
									</CardFooter>
								</Card>
							</Link>
						</div>
					);
				})}
			</div>
		</div>
	);
};
