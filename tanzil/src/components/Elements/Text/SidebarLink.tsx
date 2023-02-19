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
		<Link to={props.path.to} className={clsx('mt-2 flex h-14 w-full items-center rounded')}>
			<IconButton className={clsx('hover:text-text flex w-full justify-start py-1', props.isActive && 'bg-secondary text-primary')} variant={'ghost'}>
				{props.path.icon}
				{props.showText && (
					<p className=' text-clip whitespace-nowrap text-lg font-normal'>
						{props.path.title}
					</p>
				)}
			</IconButton>
		</Link>
	);
}
