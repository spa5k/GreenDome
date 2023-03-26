import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';

const toggleVariants = cva(
	'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors data-[state=on]:bg-background focus:outline-none text-text focus:ring-2 focus:ring-border focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-secondary bg-background data-[state=on]:text-secondary',
	{
		variants: {
			variant: {
				default: 'bg-transparent text-secondary dark:text-tertiary hover:text-text_button',
				outline: 'bg-transparent border border-border hover:bg-background',
			},
			size: {
				default: 'h-10 px-3',
				sm: 'h-9 px-2.5',
				lg: 'h-11 px-5',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

const Toggle = React.forwardRef<
	React.ElementRef<typeof TogglePrimitive.Root>,
	& React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>
	& VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
	<TogglePrimitive.Root
		ref={ref}
		className={clsx(toggleVariants({ variant, size, className }))}
		{...props}
	/>
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
