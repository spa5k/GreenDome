import { Link } from '@tanstack/react-location';
import { ReactElement } from 'react';

export function SidebarLink(
	props: {
		path: {
			to: string | number | null | undefined;
			icon: ReactElement;
			title: string;
		};
		isActive: boolean;
		showText: boolean;
	},
) {
	return (
		<Link to={props.path.to} className={clsx('mt-2 flex h-14 w-full items-center rounded pl-3', props.isActive && 'text-accent-focus')}>
			{props.path.icon}
			{props.showText && (
				<span className='font-lg ml-2 truncate whitespace-nowrap text-lg w-full'>
					{props.path.title}
				</span>
			)}
		</Link>
	);
}
