import { Link, useLocation } from '@tanstack/react-location';
import { RefObject } from 'react';
import { ImperativePanelHandle } from 'react-resizable-panels';

const mainRoutes = [
	{
		title: 'Dashboard',
		selected: false,
		id: 1,
		to: '/',
		icon: <IconFa6SolidHouseChimneyWindow className='min-h-6 mr-2 h-6 w-6' style={{ minWidth: '1.5rem' }} />,
	},
	{
		title: 'Quran',
		selected: false,
		id: 2,
		to: '/surah',
		icon: <IconFaSolidQuran className='min-h-6 mr-2 h-6 w-6' style={{ minWidth: '1.5rem' }} />,
	},
	{ title: 'Surah 2', selected: false, id: 6, to: '/surah/2', icon: <IconFaSolidQuran className='min-h-6 mr-2 h-6 w-6' style={{ minWidth: '1.5rem' }} /> },
	{ title: 'Hadith', selected: true, id: 3, to: '/hadith', icon: <IconIonMdMap className='min-h-6 mr-2 h-6 w-6' style={{ minWidth: '1.5rem' }} /> },
	{
		title: 'Salah',
		selected: true,
		id: 4,
		to: '/salah',
		icon: <IconMdiClockTimeEight className='min-h-6 mr-2 h-6 w-6' style={{ minWidth: '1.5rem' }} />,
	},
	{
		title: 'Tracker',
		selected: true,
		id: 5,
		to: '/tracker',
		icon: <IconMaterialSymbolsCheckCircle className='min-h-6 mr-2 h-6 w-6' style={{ minWidth: '1.5rem' }} />,
	},
];
const secondaryRoutes = [
	{
		title: 'Settings',
		selected: false,
		id: 1,
		to: '/settings',
		icon: <IconIonSettingsSharp className='min-h-6 mr-2 h-6 w-6' style={{ minWidth: '1.5rem' }} />,
	},
];

const ToggleClassName = clsx(
	'hover:bg-subtle dark:focus:ring-offset-secondary inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-100 dark:focus:ring-slate-400',
);

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
		<div className='mx-1 h-full basis-1/4 py-2'>
			<div className='flex w-full items-end justify-end '>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger
							onClick={toggleSidebar}
							className='h-8 w-8'
						>
							{(leftSidebarState || !showText)
								? <IconIcRoundKeyboardArrowRight className={ToggleClassName} />
								: <IconIcRoundKeyboardArrowLeft className={ToggleClassName} />}
						</TooltipTrigger>
						<TooltipContent>
							Collapse
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>

			<div className='flex h-full flex-col items-start overflow-hidden rounded pl-1 '>
				<Link className='mt-3 flex w-full items-center pl-3' to='/'>
					<IconLineMdMoonFilledLoop className='h-8 w-8 fill-current' style={{ minWidth: '2rem' }} />
					{showText && <span className='ml-2 truncate text-2xl font-bold'>Quran</span>}
				</Link>

				<div className='my-2 w-full py-2'>
					<div className='mt-3 flex w-full flex-col items-center transition-shadow duration-500'>
						{mainRoutes.map((path) => {
							const isActive = pathName === path.to;
							return <SidebarLink key={path.id} isActive={isActive} showText={showText} path={path} />;
						})}
					</div>
					<div className='mt-3 flex w-full flex-col items-center transition-shadow duration-500'>
						{secondaryRoutes.map((path) => {
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
