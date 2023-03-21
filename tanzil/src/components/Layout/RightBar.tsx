
// eslint-disable-next-line no-restricted-imports
import Salah from '@/features/salah/Salah.js'; //import path can not end with .ts or .tsx

export default function RightBar(): JSX.Element {
	return (
		<div className='h-full basis-1/4'>
			<Salah /> 
		</div>
	);
}
