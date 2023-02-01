import { Link, useLocation } from '@tanstack/react-location';
import { RefObject } from 'react';
import { ImperativePanelHandle } from 'react-resizable-panels';

const mainRoutes = [
	{ title: 'Dashboard', selected: false, id: 1, to: '/', icon: <IconFa6SolidHouseChimneyWindow className='min-h-6 h-6 w-6' style={{ minWidth: '1.5rem' }} /> },
	{ title: 'Quran', selected: false, id: 2, to: '/surah', icon: <IconFaSolidQuran className='min-h-6 h-6 w-6' style={{ minWidth: '1.5rem' }} /> },
	{ title: 'Hadith', selected: true, id: 3, to: '/hadith', icon: <IconIonMdMap className='min-h-6 h-6 w-6' style={{ minWidth: '1.5rem' }} /> },
	{ title: 'Prayer Times', selected: true, id: 4, to: '/salah', icon: <IconMdiClockTimeEight className='min-h-6 h-6 w-6' style={{ minWidth: '1.5rem' }} /> },
	{
		title: 'Prayer Tracker',
		selected: true,
		id: 5,
		to: '/tracker',
		icon: <IconMaterialSymbolsCheckCircle className='h-6 w-6 stroke-current' style={{ minWidth: '1.5rem' }} />,
	},
];
const secondaryRoutes = [
	{ title: 'Settings', selected: false, id: 1, to: '/settings', icon: <IconIonSettingsSharp style={{ minWidth: '1.5rem' }} /> },
];

export const LeftBar = ({ hideText, handler }: { hideText: boolean; handler: RefObject<ImperativePanelHandle>; }) => {
	const pathName = useLocation().current.pathname;
	const [leftSidebarState, setleftSidebarState] = useState(false);
	const showText = !hideText;

	const [localSize, setLocalSize] = useLocalStorageState('localStorage', { defaultValue: 3 });

	const toggleSidebar = () => {
		setleftSidebarState(() => !leftSidebarState);
		const panel = handler.current;
		if (panel) {
			const size = panel?.getSize();
			if (size > 3) {
				setLocalSize(size);
				panel?.resize(3);
			} else {
				panel?.resize(localSize);
			}
		}
	};

	return (
		<div className='bg-base-100 mx-1 h-full basis-1/4 py-2'>
			<div className='flex w-full items-end justify-end'>
				<IconButton
					icon={(leftSidebarState || !showText) ? <IconIcRoundKeyboardArrowRight /> : <IconIcRoundKeyboardArrowLeft />}
					onClick={toggleSidebar}
				/>
			</div>

			<div className='flex h-full flex-col items-start overflow-hidden rounded pl-2 '>
				<Link className='mt-3 flex w-full items-center pl-3' to='/'>
					<IconLineMdMoonFilledLoop className='h-8 w-8 fill-current' style={{ minWidth: '2rem' }} />
					{showText && <span className='ml-2 truncate text-2xl font-bold'>Quran</span>}
				</Link>

				<div className='my-2 py-2 w-full'>
					<div className='mt-3 flex flex-col items-center transition-shadow duration-500 w-full'>
						{mainRoutes.map((path) => {
							const isActive = pathName === path.to;
							return <SidebarLink key={path.id} isActive={isActive} showText={showText} path={path}></SidebarLink>;
						})}
					</div>
					<div className='mt-3 flex flex-col items-center transition-shadow duration-500 w-full'>
						{secondaryRoutes.map((path) => {
							const isActive = pathName === path.to;
							return <SidebarLink key={path.id} isActive={isActive} showText={showText} path={path}></SidebarLink>;
						})}
					</div>
				</div>

				<Link className='mt-auto flex h-16 w-full items-center rounded px-3 hover:drop-shadow-[0_5px_5px_rgba(0,0,0,0.35)]' to='#'>
					<IconMdiAccountOutline className='h-8 w-8 fill-current' style={{ minWidth: '2rem' }} />
					{!hideText
						&& <span className='ml-2 text-xl'>Account</span>}
				</Link>
			</div>
		</div>
	);
};
