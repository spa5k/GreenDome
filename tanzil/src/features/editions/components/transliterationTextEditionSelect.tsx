export const TransliterationsTextEditionSelector = () => {
	const { changeTransliterationEditions, transliterations, isEnabled } = useTransliterationTrackedStore();
	// format translations to be used in react-select
	if (!transliterations) return null;

	return (
		<CommandGroup heading='Transliterations'>
			{transliterations.map((translation) => (
				<CommandItem key={translation.name}>
					<div className='flex cursor-pointer items-center space-x-2'>
						<Checkbox
							checked={isEnabled(translation.name)}
							onClick={() => {
								changeTransliterationEditions(translation.name);
							}}
						/>

						<label
							htmlFor='terms'
							className='hidden text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
						>
							{translation.name}
						</label>
						<p>
							{translation.language} - {translation.author}
						</p>
					</div>
				</CommandItem>
			))}
		</CommandGroup>
	);
};
