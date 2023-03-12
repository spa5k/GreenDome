export const Settings = () => {
	const {
		translationSettings,
		transliterationSettings,
		recitationSettings,
	} = useSettingsStore();

	const { toggleTranslation, translationEnabled } = translationSettings();
	const { toggleTransliteration, transliterationEnabled } = transliterationSettings();
	const { toggleRecitation, recitationEnabled } = recitationSettings();

	return (
		<DialogContent className='sm:max-w-[625px]'>
			<DialogHeader>
				<DialogTitle>Settings</DialogTitle>
				<DialogDescription>
					Make changes to your settings here.
				</DialogDescription>
			</DialogHeader>
			<Tabs defaultValue='settings' className='w-full'>
				<TabsList className='w-full justify-between'>
					<TabsTrigger value='settings'>Toggle Settings</TabsTrigger>
					<TabsTrigger value='quran'>Quran</TabsTrigger>
					<TabsTrigger value='recitation' disabled={!recitationEnabled}>Recitation</TabsTrigger>
					<TabsTrigger value='translations' disabled={!translationEnabled}>Translations</TabsTrigger>
					<TabsTrigger value='transliteraions' disabled={!transliterationEnabled}>Transliteraions</TabsTrigger>
				</TabsList>
				<TabsContent value='settings'>
					<div className='mx-10 w-full'>
						<div className='grid w-4/5 gap-4 py-4'>
							<div className='flex justify-between'>
								<Label htmlFor='name' className='text-right'>
									Translations
								</Label>
								<SwitchIcon
									id='name'
									value='Pedro Duarte'
									className='col-span-3'
									onClick={toggleTranslation}
									checked={translationEnabled}
								/>
							</div>
							<div className='flex flex-col justify-between'>
								<div className='flex justify-between'>
									<Label htmlFor='name' className='text-right'>
										Transliterations
									</Label>
									<SwitchIcon id='name' value='Pedro Duarte' className='col-span-3' onClick={toggleTransliteration} checked={transliterationEnabled} />
								</div>
							</div>
							<div className='flex flex-col justify-between'>
								<div className='flex justify-between'>
									<Label htmlFor='name' className='text-right'>
										Recitation
									</Label>
									<SwitchIcon id='name' value='Pedro Duarte' className='col-span-3' onClick={toggleRecitation} checked={recitationEnabled} />
								</div>
							</div>
						</div>
					</div>
				</TabsContent>
				<TabsContent value='quran'>
					<div className='inline-flex rounded-md shadow-sm' role='group'>
						<button
							type='button'
							className='rounded-l-lg border border-gray-900 bg-transparent px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:bg-gray-900 focus:text-white focus:ring-2 focus:ring-gray-500 dark:border-white dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700'
						>
							Profile
						</button>
						<button
							type='button'
							className='border-y border-gray-900 bg-transparent px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:bg-gray-900 focus:text-white focus:ring-2 focus:ring-gray-500 dark:border-white dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700'
						>
							Settings
						</button>
						<button
							type='button'
							className='rounded-r-md border border-gray-900 bg-transparent px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:bg-gray-900 focus:text-white focus:ring-2 focus:ring-gray-500 dark:border-white dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700'
						>
							Downloads
						</button>
					</div>
				</TabsContent>
			</Tabs>
		</DialogContent>
	);
};
