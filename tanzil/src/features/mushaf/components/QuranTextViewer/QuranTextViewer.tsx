import { Ayah, Edition } from '@/utils/bindings.js';

type QuranTextViewerProps = {
	edition: Edition;
	ayah: Ayah;
};

export const QuranTextViewer = ({ ayah }: QuranTextViewerProps) => {
	return (
		<p className='leading-7 [&:not(:first-child)]:mt-6' style={{ fontFamily: 'Uthmanic' }}>
			{ayah.text}
		</p>
	);
};
