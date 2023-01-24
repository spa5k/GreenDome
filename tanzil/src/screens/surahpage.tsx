import { Surahs } from '@/utils/bindings.js';

export const SurahPage = ({ surahs }: { surahs: Surahs[] | undefined; }) => {
	console.log(surahs);
	return (
		<div className='flex h-screen'>
			<p>Surah</p>
		</div>
	);
};
