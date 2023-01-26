import { Link, useLocation } from '@tanstack/react-location';
import { clsx } from 'clsx';

const mainRoutes = [
	{ title: 'Dashboard', selected: false, id: 1, to: '/', icon: <IconFa6SolidHouseChimneyWindow /> },
	{ title: 'Quran', selected: false, id: 2, to: '/surah', icon: <IconFaSolidQuran /> },
	{ title: 'Hadith', selected: true, id: 3, to: '/hadith', icon: <IconIonMdMap /> },
	{ title: 'Prayer Times', selected: true, id: 4, to: '/salah', icon: <IconMdiClockTimeEight /> },
	{ title: 'Prayer Tracker', selected: true, id: 5, to: '/tracker', icon: <IconMaterialSymbolsCheckCircle /> },
];

const secondaryRoutes = [
	{ title: 'Settings', selected: false, id: 1, to: '/settings', icon: <IconIcBaselineSettings /> },
];

export default function LeftBar({ hideText }: { hideText: boolean; }) {
	const pathName = useLocation().current.pathname;

	return (
		<div className='h-full py-2 mx-1 basis-1/4 bg-base-100'>
			<div className='flex flex-col items-start h-full overflow-hidden '>
				{
					/* <Link className='flex items-center w-full px-3 mt-3' to='/'>
					<img
						src='/favicon.svg'
						className='h-16 rounded-lg bg-primary'
						alt='Salam App Logo'
					/>
					<span className='ml-2 text-sm font-bold'>Quran</span>
				</Link> */
				}
				<ul className='w-full menu my-2 py-2  menu-compact lg:menu-normal'>
					{mainRoutes.map((path) => {
						const isActive = pathName === path.to;
						return (
							<li key={path.id} className={clsx('w-full hover-bordered h-14', isActive && 'active')}>
								<Link to={path.to} className={clsx('h-14', hideText && 'justify-center')}>
									{path.icon}
									{!hideText && (
										<p className='whitespace-nowrap'>
											{path.title}
										</p>
									)}
								</Link>
							</li>
						);
					})}

					<li className='menu-title'>
						<span>More</span>
					</li>

					{secondaryRoutes.map((path) => {
						const isActive = pathName === path.to;
						return (
							<li key={path.id} className={clsx('w-full hover-bordered', isActive && 'active')}>
								<Link to={path.to} className={clsx('h-14', hideText && 'pr-2')}>
									{path.icon}
									{!hideText && (
										<p className='whitespace-nowrap'>
											{path.title}
										</p>
									)}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
