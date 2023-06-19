import { Icon } from '@iconify/react';
import { Button, Dialog, DialogTrigger } from '@quran/elements';
import { useEffect, useState } from 'react';
import { ThemeChange } from '..';
import { Settings } from '../Settings/Settings';

export const MenuButtons = () => {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const down = (e: { key: string; metaKey: unknown; }) => {
			if (e.key === 'k' && e.metaKey) {
				setOpen((open) => !open);
			}
		};

		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, []);
	return (
		<div
			data-tauri-drag-region
			className='inline-flex h-full w-full items-center justify-start'
		>
			<ThemeChange />
			<Dialog>
				<DialogTrigger asChild>
					<Button variant='ghost' className='h-8 focus:outline-none'>
						<Icon icon='solar:settings-outline' />
					</Button>
				</DialogTrigger>
				<Settings />
			</Dialog>

			<Button onClick={() => setOpen(!open)} variant='ghost' className='h-8 focus:outline-none'>
				<Icon icon='mingcute:search-3-fill' />
			</Button>
		</div>
	);
};
