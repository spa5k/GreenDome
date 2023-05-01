import { Checkbox, CommandGroup, CommandItem } from '@quran/elements';
import { Edition } from '../../..';
import { useTranslationTrackedStore } from '..';

export const TranslationsTextEditionSelector = () => {
	const { changeTranslationEditions, translations, isEnabled } = useTranslationTrackedStore();
	// format translations to be used in react-select
	if (!translations) return null;

	return (
		<CommandGroup heading='Translations'>
			{translations.map((translation: Edition) => (
				<CommandItem key={translation.name}>
					<div className='flex cursor-pointer items-center space-x-2'>
						<Checkbox
							checked={isEnabled(translation.name)}
							onClick={() => {
								changeTranslationEditions(translation.name);
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
