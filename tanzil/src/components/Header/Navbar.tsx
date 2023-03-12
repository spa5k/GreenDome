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
		<nav className='py-2 px-6 shadow-sm'>
			<div className='flex justify-between'>
				<p className='text-xl normal-case'>Quran</p>
				<div className='space-x-6'>
					<ThemeChange />
					<Dialog>
						<DialogTrigger className='hover:bg-subtle dark:focus:ring-offset-secondary bg-secondary text-text_button hover:text-text data-[state=open]:bg-tertiary data-[state=open]:text-secondary inline-flex h-12 items-center justify-center rounded-lg py-2 px-4 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:focus:ring-slate-400'>
							<IconIonSettingsSharp />
						</DialogTrigger>
						<Settings />
					</Dialog>
					<IconButton onClick={() => setOpen(!open)}>
						<IconMingcuteSearch3Fill />
					</IconButton>
					<CommandDialog open={open} onOpenChange={setOpen}>
						<Command className='rounded-lg border border-slate-100  shadow-md dark:border-slate-800'>
							<CommandInput placeholder='Type a command or search...' />
							<CommandList>
								<CommandEmpty>No results found.</CommandEmpty>
								<CommandGroup heading='Suggestions'>
									<CommandItem>
										<IconMdiCalendarMonth className='mr-2 h-4 w-4' />
										<span>Calendar</span>
									</CommandItem>
									<CommandItem>
										<IconFa6SolidFaceSmileBeam className='mr-2 h-4 w-4' />
										<span>Search Emoji</span>
									</CommandItem>
									<CommandItem>
										<IconMaterialSymbolsCalculateSharp className='mr-2 h-4 w-4' />
										<span>Calculator</span>
									</CommandItem>
								</CommandGroup>
								<CommandSeparator />
								<CommandGroup heading='Settings'>
									<CommandItem>
										<IconRiUserHeartLine className='mr-2 h-4 w-4' />
										<span>Profile</span>
										<CommandShortcut>⌘P</CommandShortcut>
									</CommandItem>
									<CommandItem>
										<IconCiCreditCard className='mr-2 h-4 w-4' />
										<span>Billing</span>
										<CommandShortcut>⌘B</CommandShortcut>
									</CommandItem>
									<CommandItem>
										<IconIcSharpSettings className='mr-2 h-4 w-4' />
										<span>Settings</span>
										<CommandShortcut>⌘S</CommandShortcut>
									</CommandItem>
								</CommandGroup>
							</CommandList>
						</Command>
					</CommandDialog>
				</div>
			</div>
		</nav>
	);
};
