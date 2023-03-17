export const TranslationsTextEditionSelector = () => {
	const { changeTranslationEditions, enabledTranslations, toggleTranslation, translationEnabled, translations } = useTranslationTrackedStore();
	console.log('getEnabledQuranTextEdition', enabledTranslations, translations);

	return (
		<div className='flex flex-col items-center'>
			<div className='flex flex-col items-center'>
			</div>
		</div>
	);
};
