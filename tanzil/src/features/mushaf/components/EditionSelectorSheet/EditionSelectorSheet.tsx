export const EditionSelectorSheet = () => {
	const { enabledQuranFontEdition } = useQuranTrackedStore();
	const { enabledTranslations } = useTranslationTrackedStore();
	const { enabledTransliterations } = useTransliterationTrackedStore();

	return (
		<Sheet>
			<SheetTrigger className='hover:bg-subtle dark:focus:ring-offset-secondary bg-secondary text-text_button hover:text-text ACTIVECLASS inline-flex h-12 items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-slate-100 dark:focus:ring-slate-400'>
				Change Font
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Select Quran Font, Translations and Transliteraions</SheetTitle>
					<SheetDescription>
						{enabledTranslations.map((translation) => (
							<div key={translation.id}>
								<h1>{translation.language} - {translation.author}</h1>
							</div>
						))}
						{enabledTransliterations.map((transliteration) => (
							<div key={transliteration.id}>
								<h1>{transliteration.language} - {transliteration.author}</h1>
							</div>
						))}
						{enabledQuranFontEdition && (
							<div>
								<h1>{enabledQuranFontEdition.author}</h1>
							</div>
						)}
					</SheetDescription>
				</SheetHeader>
				<div className='space-y-20'>
					<Command className='h-72 w-full'>
						<CommandInput placeholder='Select Quran Font' />
						<CommandList className=''>
							<CommandEmpty>No results found.</CommandEmpty>
							<QuranTextEditionSelector />
						</CommandList>
					</Command>
					<Command className='h-72 w-full'>
						<CommandInput placeholder='Search or select Translations' />
						<CommandList className=''>
							<CommandEmpty>No results found.</CommandEmpty>

							<TranslationsTextEditionSelector />
						</CommandList>
					</Command>
					<Command className='h-72 w-full'>
						<CommandInput placeholder='Search or select Transliteraions' />
						<CommandList className=''>
							<CommandEmpty>No results found.</CommandEmpty>

							<TransliterationsTextEditionSelector />
						</CommandList>
					</Command>
				</div>
			</SheetContent>
		</Sheet>
	);
};
