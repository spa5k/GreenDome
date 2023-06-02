import { Icon } from '@iconify/react/dist/iconify.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Label, Switch } from '@quran/elements';
import { useSalahTrackedStore } from '../store';

export const NotificationSettingsForm = () => {
	const {
		prayersNotification,
		azanEnabled,
		setAzanEnabled,
		setPrayersNotification,
	} = useSalahTrackedStore();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Notification</CardTitle>
				<CardDescription>
					Configure Salah Notifications
				</CardDescription>
			</CardHeader>
			<CardContent className='space-y-2'>
				<div className=' flex items-center space-x-4 rounded-md border p-4'>
					<Icon icon='material-symbols:notifications-active-sharp' />
					<div className='flex-1 space-y-1'>
						<p className='text-sm font-medium leading-none'>
							Azan
						</p>
						<p className='text-sm text-muted-foreground'>
							Play Azan when salah time
						</p>
					</div>
					<Switch
						onClick={() => {
							setAzanEnabled(!azanEnabled);
						}}
						checked={azanEnabled}
					/>
				</div>

				<div className='grid grid-cols-2 items-center gap-32'>
					<Label htmlFor='fajr' className='text-right'>
						Fajr
					</Label>
					<Switch
						onClick={() => {
							setPrayersNotification('fajr', true);
						}}
						checked={prayersNotification?.fajr}
					/>
				</div>
				<div className='grid grid-cols-2 items-center gap-32'>
					<Label htmlFor='dhuhr' className='text-right'>
						Dhuhr
					</Label>
					<Switch
						onClick={() => {
							setPrayersNotification('dhuhr', true);
						}}
						checked={prayersNotification?.dhuhr}
					/>
				</div>
				<div className='grid grid-cols-2 items-center gap-32'>
					<Label htmlFor='asr' className='text-right'>
						Asr
					</Label>
					<Switch
						onClick={() => {
							setPrayersNotification('asr', true);
						}}
						checked={prayersNotification?.asr}
					/>
				</div>
				<div className='grid grid-cols-2 items-center gap-32'>
					<Label htmlFor='maghrib' className='text-right'>
						Maghrib
					</Label>
					<Switch
						onClick={() => {
							setPrayersNotification('maghrib', true);
						}}
						checked={prayersNotification?.maghrib}
					/>
				</div>
				<div className='grid grid-cols-2 items-center gap-32'>
					<Label htmlFor='isha' className='text-right'>
						Isha
					</Label>
					<Switch
						onClick={() => {
							setPrayersNotification('isha', true);
						}}
						checked={prayersNotification?.isha}
					/>
				</div>
			</CardContent>
		</Card>
	);
};
