import { Surahs } from '@/utils/bindings.js';

export const SurahPage = ({ surahs }: { surahs: Surahs[] | undefined; }) => {
	console.log(surahs);
	return (
		<div className='flex h-screen grow bg-base-200'>
			<p>Surah</p>
		</div>
	);
};
