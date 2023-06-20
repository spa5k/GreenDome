import { Icon } from '@iconify/react';
import { Card, CardContent, CardFooter } from '@quran/elements';
import { useContext } from 'react';
import { EnvironmentContext, Surahs } from '..';

export const SurahPage = ({ surahs }: { surahs: Surahs[] | undefined; }) => {
	const { Link } = useContext(EnvironmentContext);

	return (
		<div className='container mt-4 flex h-full min-h-screen justify-center'>
			<div className='flex  flex-wrap justify-center p-7 transition-all duration-300'>
				{surahs?.map((surah) => {
					return (
						<div className='m-4  w-[300px]' key={surah.id}>
							<Link
								href={`/surah/${surah.id}`}
								key={surah.id}
								className='group relative  h-28 '
							>
								<Card>
									<CardContent>
										<div className=' flex justify-between space-x-2 text-xl font-medium sm:text-2xl'>
											<div>
												<h2 className=''>
													{surah.id}. {surah.nameSimple}
												</h2>

												<p>
													{surah.nameArabic}
												</p>
											</div>
											<CardFooter className='flex items-center '>
												{surah.reveleationPlace === 'makkah'
													? <Icon icon='fluent-emoji-high-contrast:kaaba' className='h-10 w-10 sm:h-8 sm:w-8' />
													: <Icon icon='fa6-solid:mosque' className='h-10 w-10 sm:h-8 sm:w-8' />}
											</CardFooter>
										</div>
									</CardContent>
								</Card>
							</Link>
						</div>
					);
				})}
			</div>
		</div>
	);
};
