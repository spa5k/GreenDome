import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.List>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.List
		ref={ref}
		className={clsx(
			'bg-tertiary inline-flex items-center justify-center rounded-md p-1 dark:bg-slate-800',
			className,
		)}
		{...props}
	/>
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Trigger
		className={clsx(
			'data-[state=active]:text-text_button dark:data-[state=active]:bg-background dark:data-[state=active]:text-text text-text inline-flex min-w-[100px] items-center  justify-center rounded-[0.185rem] px-3 py-1.5  text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50  data-[state=active]:bg-white data-[state=active]:shadow-sm',
			className,
		)}
		{...props}
		ref={ref}
	/>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Content
		className={clsx(
			'mt-2 rounded-md border border-slate-200 p-6 dark:border-slate-700',
			className,
		)}
		{...props}
		ref={ref}
	/>
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };