export const QuranTextEditionSelector = () => {
	const { enabledQuranFontEdition, changeQuranFontEdition, quranTextFontEditions } = useQuranTrackedStore();

	return (
		<CommandGroup heading='Quran Font'>
			<RadioGroup defaultValue='option-one'>
				{quranTextFontEditions?.map((edition) => (
					<CommandItem
						key={edition.name}
						value={edition.name}
						onSelect={() => {
							changeQuranFontEdition(edition);
						}}
						className='cursor-pointer'
					>
						<div className='flex cursor-pointer items-center space-x-2'>
							<RadioGroupItem
								value='option-one'
								id='option-one'
								checked={edition.name === enabledQuranFontEdition?.name}
							/>
							<Label htmlFor='option-one'>{edition.author} - {edition.name}</Label>
						</div>
					</CommandItem>
				))}
			</RadioGroup>
		</CommandGroup>
	);
};
