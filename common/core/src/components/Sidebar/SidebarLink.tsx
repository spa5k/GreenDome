import { Button, cn } from '@quran/elements';
import { ReactElement, useContext } from 'react';
import { EnvironmentContext } from '../..';

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
	const { Link } = useContext(EnvironmentContext);
	return (
		<Link href={props.path.to as string} className={cn('mt-2 flex h-14 w-full items-center rounded')}>
			<Button
				className={cn(
					'hover: flex w-full justify-start py-1',
					props.isActive && 'bg-secondary text-primary',
				)}
			>
				{props.path.icon}
				{props.showText && (
					<p className=' text-clip whitespace-nowrap text-lg font-normal'>
						{props.path.title}
					</p>
				)}
			</Button>
		</Link>
	);
}
