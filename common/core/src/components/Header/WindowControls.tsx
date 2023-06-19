import { Icon } from '@iconify/react/dist/iconify.js';
import { Button } from '@quran/elements';

type WindowControlsProps = {
	minimizeWindow: () => void;
	maximizeWindow: () => void;
	closeWindow: () => void;
};

export const WindowControls = ({ minimizeWindow, maximizeWindow, closeWindow }: WindowControlsProps) => {
	return (
		<div
			data-tauri-drag-region
			className='inline-flex h-full w-full justify-end'
		>
			<Button
				onClick={minimizeWindow}
				variant='ghost'
				className='h-8 focus:outline-none'
			>
				<Icon icon='lucide-minimize' className='h-3 w-3' />
			</Button>
			<Button
				onClick={maximizeWindow}
				variant='ghost'
				className='h-8 focus:outline-none'
			>
				<Icon icon='lucide-maximize' className='h-4 w-4' />
			</Button>
			<Button
				onClick={closeWindow}
				variant='ghost'
				className='h-8 focus:outline-none'
			>
				<Icon icon='lucide-x' className='h-4 w-4' />
			</Button>
		</div>
	);
};
