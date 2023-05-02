import { Icon } from '@iconify/react/dist/iconify.js';
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	DialogFooter,
	Input,
	Label,
} from '@quran/elements';
import { getCoordinates } from '..';
import { useLocationTrackedStore } from '../store';

export const LocationSettingsForm = () => {
	const { latitude, longitude, setLatitude, setLongitude } = useLocationTrackedStore();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Location</CardTitle>
				<CardDescription>
					Input Custom Location or Get Location Automatically
				</CardDescription>
			</CardHeader>
			<CardContent className='space-y-2'>
				<div className='grid grid-cols-4 items-center gap-4'>
					<Label htmlFor='latitude' className='text-right'>
						Latitude:
					</Label>
					<Input
						type='number'
						value={latitude}
						onChange={(event) => setLatitude(event.target.valueAsNumber)}
						id='latitude'
						className='col-span-3'
					/>
				</div>
				<div className='grid grid-cols-4 items-center gap-4'>
					<Label htmlFor='longitude' className='text-right'>
						Longitude:
					</Label>
					<Input
						type='number'
						value={longitude}
						onChange={(event) => setLongitude(event.target.valueAsNumber)}
						id='longitude'
						className='col-span-3'
					/>
				</div>
			</CardContent>
			<DialogFooter className='m-6'>
				<Button onClick={() => getCoordinates(true)}>
					<Icon icon='ic:round-my-location' className='mr-2' />
					Get Location
				</Button>
			</DialogFooter>
		</Card>
	);
};
