import { Surahs } from '@/utils/bindings.js';
import { Link } from '@tanstack/react-location';

export const SurahPage = ({ surahs }: { surahs: Surahs[] | undefined; }) => {
	return (
		<>
			<div className='container mx-auto mt-4 h-full min-h-screen'>
				<div className='grid-auto-fit animate-in grid gap-10 p-7 transition-all duration-300'>
					{surahs?.map((surah) => {
						return (
							<>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger>
											<Link
												to={`${surah.id}`}
												key={surah.id}
												preload={surah.id}
												className='group relative block h-20 sm:h-28 lg:h-32'
											>
												<span className='border-secondary absolute inset-0 rounded-lg border-2 border-dashed'></span>

												<div className='bg-background border-border text-heading hover:bg-tertiary relative flex h-full items-end rounded-lg border-2 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2'>
													<div className='p-2 !pt-0 transition-opacity group-hover:absolute group-hover:opacity-0 sm:p-4 lg:p-6'>
														{surah.reveleationPlace === 'makkah'
															? <IconFaSolidKaaba className='h-10 w-10 sm:h-8 sm:w-8' />
															: <IconFa6SolidMosque className='h-10 w-10 sm:h-8 sm:w-8' />}

														<div className='mt-4 flex space-x-2 text-xl font-medium sm:text-2xl'>
															<IconLaSlackHash />
															<h2 className=''>
																{surah.id}. {surah.nameSimple}
															</h2>
														</div>
													</div>

													<div className='absolute p-4 opacity-0 transition-opacity group-hover:relative group-hover:opacity-100 sm:p-6 lg:p-8'>
														<h3 className='text-xl font-medium sm:text-2xl'>
															{surah.id}. {surah.nameSimple}
														</h3>

														<p className='text-sm sm:text-base'>
															{surah.nameArabic} {surah.nameComplex}
														</p>
													</div>
												</div>
											</Link>
										</TooltipTrigger>
										<TooltipContent className='bg-background flex flex-row items-center space-x-3'>
											<p className='text-heading'>{surah.nameComplex}</p>
											<Toggle
												variant='default'
												aria-label='Toggle italic'
												className=''
											>
												<IconMajesticonsBookmark className='h-4 w-4' />
											</Toggle>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</>
						);
					})}
				</div>
			</div>
		</>
	);
};
