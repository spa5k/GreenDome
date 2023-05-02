import { Icon } from '@iconify/react/dist/iconify.js';
import {
	Button,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@quran/elements';
import { calculatePrayerTimes } from '../api';
import { ExtraSettingsForm } from './ExtraForm';
import { LocationSettingsForm } from './LocationForm';
import { SalahSettingsForm } from './SalahForm';

export function CalculationForm() {
	return (
		<div>
			<DialogContent className='max-w-full'>
				<DialogHeader>
					<DialogTitle>Edit Salah Parameters</DialogTitle>
					<DialogDescription>
						It will automatically update the salah times
					</DialogDescription>
				</DialogHeader>
				<Tabs defaultValue='location'>
					<TabsList className='grid w-full grid-cols-3'>
						<TabsTrigger value='location'>Location</TabsTrigger>
						<TabsTrigger value='salah'>Salah</TabsTrigger>
						<TabsTrigger value='extra'>Extra Settings</TabsTrigger>
					</TabsList>
					<TabsContent value='location'>
						<LocationSettingsForm />
					</TabsContent>
					<TabsContent value='salah'>
						<SalahSettingsForm />
					</TabsContent>
					<TabsContent value='extra'>
						<ExtraSettingsForm />
					</TabsContent>
				</Tabs>

				<div className='grid gap-4 py-4'>
				</div>
				<DialogFooter>
					<Button onClick={calculatePrayerTimes}>
						<Icon icon='ic:baseline-refresh' className='mr-2' />
						Force Recalculatation
					</Button>
				</DialogFooter>
			</DialogContent>
		</div>
	);
}
