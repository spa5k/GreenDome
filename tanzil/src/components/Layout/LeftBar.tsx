import { Link, useLocation } from '@tanstack/react-location';
import { clsx } from 'clsx';

const routes = [
	{ title: 'Dashboard', selected: false, id: 1, to: '/' },
	{ title: 'Quran', selected: false, id: 2, to: '/surah' },
	{ title: 'Hadith', selected: true, id: 3, to: '/hadith' },
	{ title: 'Prayer Times', selected: true, id: 4, to: '/salah' },
	{ title: 'Prayer Tracker', selected: true, id: 5, to: '/salah/tracker' },
	{ title: 'Settings', selected: true, id: 6, to: '/settings' },
];

export default function leftBar() {
	const pathName = useLocation().current.pathname;

	return (
		<div className='basis-1/4 bg-base-200  h-full px-3 py-2'>
			<img src='/favicon.svg' className='h-[90px] bg-primary rounded-lg ' alt='Salam App Logo' />

			<ul>
				{routes.map(path => {
					const isActive = pathName === path.to;
					return (
						<li key={path.id} className={clsx('mt-10', isActive && 'bg-primary')}>
							<Link to={path.to}>
								<p className={clsx(isActive && 'text-secondary')}>{path.title}</p>
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
