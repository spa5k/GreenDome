import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
	'active:scale-95 inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 hover:bg-subtle disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-secondary data-[state=open]:bg-slate-100',
	{
		variants: {
			variant: {
				default: 'bg-secondary text-text_button hover:text-text',
				destructive: 'bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600',
				outline: 'bg-transparent border border-border hover:bg-subtle   dark:hover:bg-subtle dark:text-text_secondary',
				subtle: 'bg-subtle text-secondary hover:bg-tertiary',
				ghost: 'bg-transparent hover:bg-brand-300 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent',
				link: 'bg-transparent underline-offset-4 hover:underline text-secondary hover:bg-transparent dark:hover:bg-transparent',
			},
			size: {
				default: 'h-12 py-2 px-4',
				sm: 'h-9 px-2 rounded-md',
				lg: 'h-14 px-8 rounded-md',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, ...props }, ref) => {
		return (
			<button
				className={clsx(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);

Button.displayName = 'Button';

export { Button, buttonVariants };
