import { Surahs } from '@/utils/bindings.js';
import { Link } from '@tanstack/react-location';

export const SurahPage = ({ surahs }: { surahs: Surahs[] | undefined; }) => {
	return (
		<>
			<div className='container mx-auto mt-4 h-full min-h-screen'>
				<div className='grid-auto-fit animate-in grid gap-4 transition-all duration-300'>
					{surahs?.map((surah) => {
						return (
							<Link to={`${surah.id}`} key={surah.id} preload={surah.id}>
								<div className='card hover:border-opacity-/0 hover:-translate-y-0.2 border-secondary min-w-7xl m-2 cursor-pointer rounded-lg border transition-all duration-200 hover:border-l-8 hover:shadow-md'>
									<div className='m-3'>
										<h2 className='mb-2 text-lg'>
											#{surah.id} {surah.nameSimple}
											<span className='text-text_button bg-secondary float-right inline rounded-full px-2 align-top font-mono text-sm'>Tag</span>
										</h2>
										<p className='text-text font-mono text-sm font-light transition-all duration-200'>
											{surah.nameArabic} {surah.nameSimple}
										</p>
									</div>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</>
	);
};
