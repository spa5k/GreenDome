import { clsx } from 'clsx';
import * as React from 'react';

export const buttonVariants = {
	primary: 'shadow-sm shadow-accent',
	inverse: 'bg-white text-blue-600',
	danger: 'bg-red-600 text-white',
};

export const roundness = {
	none: '',
	sm: 'rounded-sm',
	md: 'rounded-md',
	lg: 'rounded-lg',
};

export const buttonSizes = {
	sm: 'py-2 px-4 text-sm',
	md: 'py-2 px-6 text-md',
	lg: 'py-3 px-8 text-lg',
};

type IconProps =
	| { startIcon: React.ReactElement; endIcon?: never; }
	| { endIcon: React.ReactElement; startIcon?: never; }
	| { endIcon?: undefined; startIcon?: undefined; };

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: keyof typeof buttonVariants;
	size?: keyof typeof buttonSizes;
	round?: keyof typeof roundness;
	isLoading?: boolean;
} & IconProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			type = 'button',
			className = '',
			variant = 'primary',
			size = 'md',
			round = 'md',
			isLoading = false,
			startIcon,
			endIcon,
			...props
		},
		ref,
	) => {
		return (
			<button
				ref={ref}
				type={type}
				className={clsx(
					'flex items-center justify-center  font-medium hover:opacity-80 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70',
					buttonVariants[variant],
					buttonSizes[size],
					roundness[round],
					className,
				)}
				{...props}
			>
				{isLoading && <Spinner />}
				{!isLoading && startIcon}
				<span className='text-primary mx-2'>{props.children}</span> {!isLoading && endIcon}
			</button>
		);
	},
);

Button.displayName = 'Button';
