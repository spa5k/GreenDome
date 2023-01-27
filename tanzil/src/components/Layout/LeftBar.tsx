import { Link, useLocation } from '@tanstack/react-location';
import { clsx } from 'clsx';

const mainRoutes = [
	{ title: 'Dashboard', selected: false, id: 1, to: '/', icon: <IconFa6SolidHouseChimneyWindow className='w-6 h-6 min-h-6' style={{ minWidth: '1.5rem' }} /> },
	{ title: 'Quran', selected: false, id: 2, to: '/surah', icon: <IconFaSolidQuran className='w-6 h-6 min-h-6' style={{ minWidth: '1.5rem' }} /> },
	{ title: 'Hadith', selected: true, id: 3, to: '/hadith', icon: <IconIonMdMap className='w-6 h-6 min-h-6' style={{ minWidth: '1.5rem' }} /> },
	{ title: 'Prayer Times', selected: true, id: 4, to: '/salah', icon: <IconMdiClockTimeEight className='w-6 h-6 min-h-6' style={{ minWidth: '1.5rem' }} /> },
	{
		title: 'Prayer Tracker',
		selected: true,
		id: 5,
		to: '/tracker',
		icon: <IconMaterialSymbolsCheckCircle className='w-6 h-6 stroke-current' style={{ minWidth: '1.5rem' }} />,
	},
];

const secondaryRoutes = [
	{ title: 'Settings', selected: false, id: 1, to: '/settings', icon: <IconIcBaselineSettings style={{ minWidth: '1.5rem' }} /> },
];

export default function LeftBar({ hideText }: { hideText: boolean; }) {
	const pathName = useLocation().current.pathname;

	return (
		<div className='h-full py-2 mx-1 basis-1/4 bg-base-100'>
			<div className='flex flex-col items-start h-full overflow-hidden rounded px-2 '>
				<Link className='flex items-center w-full px-3 mt-3' to='/'>
					<IconLineMdMoonFilledLoop className='w-8 h-8 fill-current' style={{ minWidth: '2rem' }} />
					{!hideText && <span className='ml-2 text-2xl font-bold truncate'>Quran</span>}
				</Link>

				<div className='w-full my-2 py-2'>
					<div className='flex flex-col items-center w-full mt-3 border-t border-gray-700 duration-500 transition-shadow'>
						{mainRoutes.map((path) => {
							const isActive = pathName === path.to;
							return (
								<Link
									to={path.to}
									className={clsx(
										'flex items-center w-full h-14 px-3 mt-2 rounded',
										isActive && 'shadow-sm shadow-accent',
									)}
									key={path.id}
								>
									{path.icon}
									{!hideText
										&& (
											<span className='ml-2 font-lg whitespace-nowrap truncate text-lg '>
												{path.title}
											</span>
										)}
								</Link>
							);
						})}
					</div>
					<div className='flex flex-col items-center w-full mt-2 border-t border-gray-700'>
						{secondaryRoutes.map((path) => {
							const isActive = pathName === path.to;
							return (
								<Link
									to={path.to}
									className={clsx(
										'flex items-center w-full h-14 px-3 mt-2 rounded hover:drop-shadow-[0_5px_5px_rgba(0,0,0,0.35)]',
										isActive && 'shadow-primary',
									)}
									key={path.id}
								>
									{path.icon}
									{!hideText
										&& <span className='ml-2 font-medium whitespace-nowrap truncate  text-lg'>{path.title}</span>}
								</Link>
							);
						})}
						<div className='flex w-full items-start justify-start mt-2 px-3'>
							{!hideText && (
								<select data-choose-theme className='my-0 outline-none select w-full'>
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
									<option value='cmyk'>Cmyk</option>
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

				<Link className='flex items-center w-full h-16 px-3 mt-auto rounded hover:drop-shadow-[0_5px_5px_rgba(0,0,0,0.35)]' to='#'>
					<IconMdiAccountOutline className='w-8 h-8 fill-current' style={{ minWidth: '2rem' }} />
					{!hideText
						&& <span className='ml-2 text-xl'>Account</span>}
				</Link>
			</div>
		</div>
	);
}
