'use client';

import { cn, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@quran/elements';
import { useLocalStorageState } from 'ahooks';
import { RefObject, useContext, useState } from 'react';
import { ImperativePanelHandle } from 'react-resizable-panels';
import { EnvironmentContext } from '..';

import * from 'react-use-audio-player';
// unplugin icons
import { Icon } from '@iconify/react';
import { SidebarLink } from '../components/Sidebar/SidebarLink';

const mainRoutes = [
	{
		title: 'Dashboard',
		selected: false,
		id: 1,
		to: '/',
		icon: <Icon icon='material-symbols:home-rounded' className='mr-4 h-6 w-6' style={{ minWidth: '1.5rem' }} />,
	},
	{
		title: 'Quran',
		selected: false,
		id: 2,
		to: '/surah',
		icon: <Icon icon='fa6-solid:book-quran' className='mr-4 h-6 w-6' style={{ minWidth: '1.5rem' }} />,
	},
	{
		title: 'Hadith',
		selected: true,
		id: 3,
		to: '/hadith',
		icon: <Icon icon='zondicons:location' className='mr-4 h-6 w-6' style={{ minWidth: '1.5rem' }} />,
	},
	{
		title: 'Salah',
		selected: true,
		id: 4,
		to: '/salah',
		icon: (
			<Icon
				icon='ic:baseline-access-time-filled'
				className='mr-4 h-6 w-6'
				style={{ minWidth: '1.5rem' }}
			/>
		),
	},
	{
		title: 'Tracker',
		selected: true,
		id: 5,
		to: '/tracker',
		icon: <Icon icon='ic:round-check-circle' className='mr-4 h-6 w-6' style={{ minWidth: '1.5rem' }} />,
	},
];

const ToggleClassName = cn(
	'hover:bg-subtle dark:focus:ring-offset-secondary inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-100 dark:focus:ring-slate-400',
);

export const LeftBar = ({ hideText, handler }: { hideText: boolean; handler: RefObject<ImperativePanelHandle>; }) => {
	const { Link, location: pathName } = useContext(EnvironmentContext);

	const [leftSidebarState, setleftSidebarState] = useState(false);
	const showText = !hideText;

	const [localSize, setLocalSize] = useLocalStorageState('localStorage', { defaultValue: 5 });

	const playAudio = () => {
		const audio = new Audio('sounds/select.mp3');
		audio.play();
		return audio;
	};

	const toggleSidebar = () => {
		playAudio();
		setleftSidebarState(() => !leftSidebarState);
		const panel = handler.current;
		if (panel) {
			const size = panel?.getSize();
			if (size > 5) {
				setLocalSize(size);
				panel?.resize(5);
			} else {
				panel?.resize(Number(localSize));
			}
		}
	};

	return (
		<div className='mx-1 min-h-screen basis-1/4 bg-white py-2 text-black'>
			<div className='flex w-full items-end justify-end '>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger
							onClick={toggleSidebar}
							className='h-8 w-8'
						>
							{(leftSidebarState || !showText)
								? <Icon icon='ic:round-keyboard-arrow-right' className={ToggleClassName} />
								: <Icon icon='ic:round-keyboard-arrow-right' className={ToggleClassName} />}
						</TooltipTrigger>
						<TooltipContent>
							Collapse
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>

			<div className='flex h-full flex-col items-start overflow-hidden rounded px-2 '>
				<Link className='mt-3 flex w-full items-center pl-3' href='/'>
					<Icon icon='line-md:moon-filled-loop' className='h-8 w-8 fill-current' style={{ minWidth: '2rem' }} />
					{showText && <span className='ml-4 truncate text-2xl font-bold'>Quran</span>}
				</Link>
				<div className='my-2 w-full py-2'>
					<div className='mt-3 flex w-full flex-col items-center transition-shadow duration-500'>
						{mainRoutes.map((path) => {
							const isActive = pathName === path.to;
							return <SidebarLink key={path.id} isActive={isActive} showText={showText} path={path} />;
						})}
					</div>
				</div>
				<div className='mt-2 flex w-full flex-col items-start justify-start px-3'>
				</div>
			</div>
		</div>
	);
};
