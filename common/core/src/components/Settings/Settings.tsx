import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	Label,
	Switch,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@quran/elements';
import { QuranTextEditionSelector, useTranslationTrackedStore, useTransliterationTrackedStore } from '../..';

export const Settings = () => {
	const { toggleTranslation, translationEnabled } = useTranslationTrackedStore();
	const { toggleTransliteration, transliterationEnabled } = useTransliterationTrackedStore();
	// const { toggleRecitation, recitationEnabled } = useRecitationTrackedStore();

	return (
		<DialogContent className='sm:max-w-[625px]'>
			<DialogHeader>
				<DialogTitle>Settings</DialogTitle>
				<DialogDescription>
					Make changes to your settings here.
				</DialogDescription>
			</DialogHeader>
			<Tabs defaultValue='settings' className='w-full'>
				<TabsList className='w-full justify-between'>
					<TabsTrigger value='settings'>Toggle Settings</TabsTrigger>
					<TabsTrigger value='quran'>Quran</TabsTrigger>
					{/* <TabsTrigger value='recitation' disabled={!recitationEnabled}>Recitation</TabsTrigger> */}
					<TabsTrigger value='translations' disabled={!translationEnabled}>Translations</TabsTrigger>
					<TabsTrigger value='transliteraions' disabled={!transliterationEnabled}>Transliteraions</TabsTrigger>
				</TabsList>
				<TabsContent value='settings'>
					<div className='mx-10 w-full'>
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
									<Switch
										id='name'
										value='Pedro Duarte'
										className='col-span-3'
										onClick={toggleTransliteration}
										checked={transliterationEnabled}
									/>
								</div>
							</div>
							{
								/* <div className='flex flex-col justify-between'>
								<div className='flex justify-between'>
									<Label htmlFor='name' className='text-right'>
										Recitation
									</Label>
									<SwitchIcon
										id='name'
										value='Pedro Duarte'
										className='col-span-3'
										onClick={toggleRecitation}
										checked={recitationEnabled}
									/>
								</div>
							</div> */
							}
						</div>
					</div>
				</TabsContent>
				<TabsContent value='quran'>
					<QuranTextEditionSelector />
				</TabsContent>
			</Tabs>
		</DialogContent>
	);
};
