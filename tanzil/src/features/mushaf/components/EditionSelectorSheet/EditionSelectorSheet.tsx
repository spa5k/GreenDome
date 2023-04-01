export const EditionSelectorSheet = () => {
	const { enabledQuranFontEdition } = useQuranTrackedStore();
	const { enabledTranslations } = useTranslationTrackedStore();
	const { enabledTransliterations } = useTransliterationTrackedStore();

	return (
		<Sheet>
			<SheetTrigger>
				OPEN
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
