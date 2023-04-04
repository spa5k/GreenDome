import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as React from 'react';

const Switch = React.forwardRef<
	React.ElementRef<typeof SwitchPrimitives.Root>,
	React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
	<SwitchPrimitives.Root
		className={clsx(
			'data-[state=unchecked]:bg-tertiary data-[state=checked]:bg-secondary dark:focus:ring-offset-tertiary dark:focus:ring-tertiary focus:ring-tertiary peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ',
			className,
		)}
		{...props}
		ref={ref}
	>
		<SwitchPrimitives.Thumb
			className={clsx(
				'bg-background pointer-events-none block h-5 w-5 rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
			)}
		/>
	</SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

const SwitchIcon = React.forwardRef<
	React.ElementRef<typeof SwitchPrimitives.Root>,
	React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
	<SwitchPrimitives.Root
		className={clsx(
			'data-[state=unchecked]:bg-tertiary data-[state=checked]:bg-secondary dark:focus:ring-offset-tertiary dark:focus:ring-tertiary focus:ring-tertiary peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ',
			className,
		)}
		{...props}
		ref={ref}
	>
		<SwitchPrimitives.Thumb
			className={clsx(
				'bg-background text-secondary pointer-events-none block h-5 w-5 rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 ',
			)}
		>
			{props.checked ? <IconIcSharpCheck /> : <IconCharmCross />}
		</SwitchPrimitives.Thumb>
	</SwitchPrimitives.Root>
));
SwitchIcon.displayName = `${SwitchPrimitives.Root.displayName}Icon`;

export { Switch, SwitchIcon };
