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
import { calculatePrayerTimes } from '../store';
import { ExtraForm } from './ExtraForm';
import { LocationForm } from './LocationForm';
import { SalahForm } from './SalahForm';

export function CalculationForm() {
	return (
		<div>
			<DialogContent className='max-w-full'>
				<DialogHeader>
					<DialogTitle>Edit Salah Parameters</DialogTitle>
					<DialogDescription>
						Make changes to Salah Parameters here, click save to save changes.
					</DialogDescription>
				</DialogHeader>
				<Tabs defaultValue='location'>
					<TabsList className='grid w-full grid-cols-3'>
						<TabsTrigger value='location'>Location</TabsTrigger>
						<TabsTrigger value='salah'>Salah</TabsTrigger>
						<TabsTrigger value='extra'>Extra Settings</TabsTrigger>
					</TabsList>
					<TabsContent value='location'>
						<LocationForm />
					</TabsContent>
					<TabsContent value='salah'>
						<SalahForm />
					</TabsContent>
					<TabsContent value='extra'>
						<ExtraForm />
					</TabsContent>
				</Tabs>

				<div className='grid gap-4 py-4'>
				</div>
				<DialogFooter>
					<Button onClick={calculatePrayerTimes}>
						<Icon icon='ic:baseline-refresh' className='mr-2' />
						Recalculate
					</Button>
				</DialogFooter>
			</DialogContent>
		</div>
	);
}
