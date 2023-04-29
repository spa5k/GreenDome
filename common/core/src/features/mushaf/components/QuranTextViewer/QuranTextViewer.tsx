import { Ayah, Edition } from '../../../..';

type QuranTextViewerProps = {
	edition: Edition;
	ayah: Ayah;
};

export const QuranTextViewer = ({ ayah, edition }: QuranTextViewerProps) => {
	return (
		<p className='leading-7 [&:not(:first-child)]:mt-6' style={{ fontFamily: 'Uthmanic' }} dir={edition.direction}>
			{ayah.text}
		</p>
	);
};
