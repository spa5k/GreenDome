import { Surahs } from '@/utils/bindings.js';

export const SurahPage = ({ surahs }: { surahs: Surahs[] | undefined; }) => {
	return (
		<div className='bg-base-200 flex h-screen grow'>
			<p>Surah</p>
		</div>
	);
};
