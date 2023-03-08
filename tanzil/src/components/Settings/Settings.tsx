import { Label } from '@/components/Elements/Label/label.js';

export const Settings = () => {
	const {
		changeTranslationEditions: changeTranslationEdition,
		leftbarEnabled,
		rightbarEnabled,
		enabledTranslations,
		toggleCollapsibleLeftbar,
		toggleCollapsibleRightbar,
		toggleTranslation,
		toggleTransliteration,
		translation,
		translationEnabled,
		enabledRecieter: recieter,
		recitationEnabled,
		toggleRecitation,
		transliterationEnabled,
	} = useSettingsStore();

	return (
		<DialogContent className='sm:max-w-[425px]'>
			<DialogHeader>
				<DialogTitle>Settings</DialogTitle>
				<DialogDescription>
					Make changes to your settings here.
				</DialogDescription>
			</DialogHeader>
			<div className='w-full'>
				<div className='grid w-4/5 gap-4 py-4'>
					<div className='flex justify-between'>
						<Label htmlFor='name' className='text-right'>
							Translations
						</Label>
						<Switch
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
							<Switch id='name' value='Pedro Duarte' className='col-span-3' onClick={toggleTransliteration} checked={transliterationEnabled} />
						</div>
						{transliterationEnabled && (
							<Select>
								<SelectTrigger className='w-[180px]'>
									<SelectValue placeholder='Select a transliteration' />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Fruits</SelectLabel>
										<SelectItem value='apple'>Apple</SelectItem>
										<SelectItem value='banana'>Banana</SelectItem>
										<SelectItem value='blueberry'>Blueberry</SelectItem>
										<SelectItem value='grapes'>Grapes</SelectItem>
										<SelectItem value='pineapple'>Pineapple</SelectItem>
									</SelectGroup>
									<SelectSeparator />
									<SelectGroup>
										<SelectLabel>Vegetables</SelectLabel>
										<SelectItem value='aubergine'>Aubergine</SelectItem>
										<SelectItem value='broccoli'>Broccoli</SelectItem>
										<SelectItem value='carrot' disabled>
											Carrot
										</SelectItem>
										<SelectItem value='courgette'>Courgette</SelectItem>
										<SelectItem value='leek'>Leek</SelectItem>
									</SelectGroup>
									<SelectSeparator />
									<SelectGroup>
										<SelectLabel>Meat</SelectLabel>
										<SelectItem value='beef'>Beef</SelectItem>
										<SelectItem value='chicken'>Chicken</SelectItem>
										<SelectItem value='lamb'>Lamb</SelectItem>
										<SelectItem value='pork'>Pork</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						)}
					</div>
					<div className='flex justify-between'>
						<Label htmlFor='name' className='text-right'>
							Recitations
						</Label>
						<Switch id='name' value='Pedro Duarte' className='col-span-3' onClick={toggleRecitation} checked={recitationEnabled} />
					</div>
					<div className='flex justify-between'>
						<Label htmlFor='name' className='text-right'>
							Collapse Menu
						</Label>
						<Switch id='name' value='Pedro Duarte' className='col-span-3' onClick={toggleCollapsibleLeftbar} checked={leftbarEnabled} />
					</div>
					<div className='flex justify-between'>
						<Label htmlFor='name' className='text-right'>
							Collapse Infobar
						</Label>
						<Switch id='name' value='Pedro Duarte' className='col-span-3' onClick={toggleCollapsibleRightbar} checked={rightbarEnabled} />
					</div>
				</div>
			</div>
		</DialogContent>
	);
};
