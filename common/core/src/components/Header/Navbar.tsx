import { Icon } from '@iconify/react';
import { Button, Dialog, DialogTrigger } from '@quran/elements';
import { useEffect, useState } from 'react';
import { ThemeChange } from '..';
import { Settings } from '../Settings/Settings';

export const Navbar = () => {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const down = (e: { key: string; metaKey: unknown; }) => {
			if (e.key === 'k' && e.metaKey) {
				setOpen((open) => !open);
			}
		};

		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, []);

	return (
		<nav className='px-6 py-2 shadow-sm'>
			<div className='flex justify-between'>
				<p className='text-xl normal-case'>Quran</p>
				<div className='space-x-6'>
					<ThemeChange />
					<Dialog>
						<DialogTrigger className='inline-flex h-12 items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:focus:ring-slate-400'>
							<Icon icon='solar:settings-outline' />
						</DialogTrigger>
						<Settings />
					</Dialog>
					<Button onClick={() => setOpen(!open)}>
						<Icon icon='mingcute:search-3-fill' />
					</Button>
					{
						/* <CommandDialog open={open} onOpenChange={setOpen}>
						<Command className='rounded-lg border border-slate-100  shadow-md dark:border-slate-800'>
							<CommandInput placeholder='Type a command or search...' />
							<CommandList>
								<CommandEmpty>No results found.</CommandEmpty>
								<CommandGroup heading='Suggestions'>
									<CommandItem>
										<Icon icon='material-symbols:calendar-month' className='mr-2 h-4 w-4' />
										<span>Calendar</span>
									</CommandItem>
									<CommandItem>
										<Icon icon='line-md:emoji-smile-wink' className='mr-2 h-4 w-4' />
										<span>Search Emoji</span>
									</CommandItem>
									<CommandItem>
										<Icon icon='material-symbols:calculate-outline' className='mr-2 h-4 w-4' />
										<span>Calculator</span>
									</CommandItem>
								</CommandGroup>
								<CommandSeparator />
								<CommandGroup heading='Settings'>
									<CommandItem>
										<Icon icon='material-symbols:favorite' className='mr-2 h-4 w-4' />
										<span>Profile</span>
										<CommandShortcut>⌘P</CommandShortcut>
									</CommandItem>
									<CommandItem>
										<Icon icon='material-symbols:credit-card-sharp' className='mr-2 h-4 w-4' />
										<span>Billing</span>
										<CommandShortcut>⌘B</CommandShortcut>
									</CommandItem>
									<CommandItem>
										<Icon icon='ri:settings-fill' className='mr-2 h-4 w-4' />
										<span>Settings</span>
										<CommandShortcut>⌘S</CommandShortcut>
									</CommandItem>
								</CommandGroup>
							</CommandList>
						</Command>
					</CommandDialog> */
					}
				</div>
			</div>
		</nav>
	);
};
