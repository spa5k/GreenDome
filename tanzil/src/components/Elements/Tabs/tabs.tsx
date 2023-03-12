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
			'bg-tertiary dark:bg-background inline-flex items-center justify-center rounded-md p-1',
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
			'data-[state=active]:text-text_button dark:data-[state=active]:bg-background dark:data-[state=active]:text-text text-text data-[state=active]:bg-secondary inline-flex min-w-[100px]  items-center justify-center rounded-[0.185rem] px-3  py-1.5 text-sm font-medium transition-all disabled:pointer-events-none  disabled:opacity-50 data-[state=active]:shadow-sm',
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
			'border-border mt-2 rounded-md border',
			className,
		)}
		{...props}
		ref={ref}
	/>
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
