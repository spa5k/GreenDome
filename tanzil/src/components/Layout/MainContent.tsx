// eslint-disable-next-line no-restricted-imports
import getHijriDate from '@/features/hijri/Hijri.js';

export default function MainContent() {
	return (
		<div className='h-full grow'>
			<p className='text-center'>This is Main Content</p>
			<p className='text-center'>Assalamualaikum, today is {getHijriDate('en')}</p>
		</div>
	);
}
