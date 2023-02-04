import { Link, useLocation } from '@tanstack/react-location';
import { RefObject } from 'react';
import { ImperativePanelHandle } from 'react-resizable-panels';

const mainRoutes = [
	{ title: 'Dashboard', selected: false, id: 1, to: '/', icon: <IconFa6SolidHouseChimneyWindow className='min-h-6 h-6 w-6' style={{ minWidth: '1.5rem' }} /> },
	{ title: 'Quran', selected: false, id: 2, to: '/surah', icon: <IconFaSolidQuran className='min-h-6 h-6 w-6' style={{ minWidth: '1.5rem' }} /> },
	{ title: 'Surah 2', selected: false, id: 6, to: '/surah/2', icon: <IconFaSolidQuran className='min-h-6 h-6 w-6' style={{ minWidth: '1.5rem' }} /> },
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

				<Link className='mt-3 flex w-full items-center pl-3' to='/surah/1'>
					Surah 1
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
				<div className='mt-2 flex w-full items-start justify-start px-3'>
					{!hideText && (
						<select data-choose-theme className='my-2 p-1 flex border rounded'>
							<option value='light'>Light</option>
							<option value='dark'>Dark</option>
							<option value='cupcake'>Cupcake</option>
							<option value='business'>Business</option>
							<option value='emerald'>Emerald</option>
							<option value='corporate'>Corporate</option>
							<option value='retro'>Retro</option>
							<option value='garden'>Garden</option>
							<option value='forest'>Forest</option>
							<option value='aqua'>Qqua</option>
							<option value='lofi'>Lofi</option>
							<option value='pastel'>Pastel</option>
							<option value='fantasy'>Fantasy</option>
							<option value='black'>Black</option>
							<option value='dracula'>Dracula</option>
							<option value='autumn'>Autumn</option>
							<option value='business'>Business</option>
							<option value='acid'>Acid</option>
							<option value='lemonade'>Lemonade</option>
							<option value='night'>Night</option>
							<option value='coffee'>Coffee</option>
							<option value='winter'>Winter</option>
						</select>
					)}
				</div>
			</div>
		</div>
	);
};
