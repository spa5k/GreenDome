import { RadioGroup, RadioGroupItem } from '@/components/Elements/ToggleGroup/toggleGroup.js';
import { useQuranTrackedStore } from '@/stores/quranStore.js';

export const QuranTextEditionSelector = () => {
	const { enabledQuranFontEdition, changeQuranFontEdition, quranTextFontEditions } = useQuranTrackedStore();
	console.log('getEnabledQuranTextEdition', enabledQuranFontEdition, quranTextFontEditions);

	return (
		<CommandGroup heading='Quran Font'>
			<RadioGroup defaultValue='option-one'>
				{quranTextFontEditions.map((edition) => (
					<CommandItem
						key={edition}
						value={edition}
						onSelect={() => {
							changeQuranFontEdition(edition);
						}}
						className='cursor-pointer'
					>
						<div className='flex cursor-pointer items-center space-x-2'>
							<RadioGroupItem
								value='option-one'
								id='option-one'
								checked={edition === enabledQuranFontEdition}
							/>
							<Label htmlFor='option-one'>{edition}</Label>
						</div>
					</CommandItem>
				))}
			</RadioGroup>
		</CommandGroup>
	);
};
