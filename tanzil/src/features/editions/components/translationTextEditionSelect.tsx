export const TranslationsTextEditionSelector = () => {
	const { changeTranslationEditions, enabledTranslations, toggleTranslation, translationEnabled, translations, isEnabled } = useTranslationTrackedStore();
	// format translations to be used in react-select
	if (!translations) return null;
	console.log(enabledTranslations);

	return (
		<div className='flex flex-col items-center'>
			<div className='flex flex-col items-center'>
				<div>
					{translations.map((translation) => (
						<div key={translation.name}>
							<label htmlFor={translation.name}>{translation.author}</label>
							<input
								type='checkbox'
								id={translation.name}
								name={translation.name}
								checked={isEnabled(translation.name)}
								onChange={() => {
									changeTranslationEditions(translation.name);
								}}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
