import { clsx } from 'clsx';
import * as React from 'react';

type IconProps = { icon: React.ReactElement; };

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: keyof typeof buttonVariants;
	size?: keyof typeof buttonSizes;
	round?: keyof typeof roundness;
	isLoading?: boolean;
} & IconProps;

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
	(
		{
			type = 'button',
			className = '',
			variant = 'primary',
			size = 'md',
			round = 'md',
			isLoading = false,
			icon,
			...props
		},
		ref,
	) => {
		return (
			<button
				ref={ref}
				type={type}
				className={clsx(
					'flex items-center justify-center font-medium hover:opacity-80 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70',
					buttonVariants[variant],
					buttonSizes[size],
					roundness[round],
					className,
				)}
				{...props}
			>
				{isLoading ? <Spinner /> : icon}
			</button>
		);
	},
);

IconButton.displayName = 'IconButton';
