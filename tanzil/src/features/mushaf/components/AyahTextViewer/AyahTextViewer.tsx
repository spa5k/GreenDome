import { Ayah, Edition } from '@/utils/bindings.js';

type AyahTextViewerProps = {
	edition: Edition;
	ayah: Ayah;
};

export const AyahTextViewer = ({ ayah }: AyahTextViewerProps) => {
	return (
		<p className='leading-7 [&:not(:first-child)]:mt-2'>
			{ayah.text}
		</p>
	);
};
