import { useQuranTextFontSettingsStore } from '@/stores/quranStore.js';

export const QuranTextEditionSelector = () => {
	const { enabledQuranFontEdition, changeQuranFontEdition, quranTextFontEditions } = useQuranTextFontSettingsStore();
	console.log('getEnabledQuranTextEdition', enabledQuranFontEdition, quranTextFontEditions);

	return (
		<div className='flex flex-col items-center'>
			<div className='flex flex-col items-center'>
				<Select
					onValueChange={(e) => {
						changeQuranFontEdition(e);
					}}
					value={enabledQuranFontEdition}
				>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder='Select Quran Font' />
					</SelectTrigger>
					<SelectContent>
						{quranTextFontEditions.map((edition) => (
							<SelectItem key={edition} value={edition}>
								{edition}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
};
