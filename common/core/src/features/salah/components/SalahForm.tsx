import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Input,
	Label,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@quran/elements';
import { useSalahTrackedStore } from '../store';

export const SalahSettingsForm = () => {
	const {
		method,
		fajrAngle,
		ishaAngle,
		ishaInterval,
		maghribAngle,
		madhab,
		setMethod,
		setFajrAngle,
		setIshaAngle,
		setIshaInterval,
		setMaghribAngle,
		setMadhab,
	} = useSalahTrackedStore();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Salah</CardTitle>
				<CardDescription>
					Change Salah Parameters here
				</CardDescription>
			</CardHeader>
			<CardContent className='space-y-2'>
				<div className='grid grid-cols-4 items-center gap-4'>
					<Label htmlFor='method' className='text-right'>
						Method:
					</Label>
					<Select
						onValueChange={(value) => {
							if (value === 'Karachi') {
								setMethod('Karachi');
							} else if (value === 'MuslimWorldLeague') {
								setMethod('MuslimWorldLeague');
							} else if (value === 'Egyptian') {
								setMethod('Egyptian');
							} else if (value === 'UmmAlQura') {
								setMethod('UmmAlQura');
							} else if (value === 'Dubai') {
								setMethod('Dubai');
							} else if (value === 'Kuwait') {
								setMethod('Kuwait');
							} else if (value === 'Qatar') {
								setMethod('Qatar');
							} else if (value === 'Singapore') {
								setMethod('Singapore');
							} else if (value === 'Tehran') {
								setMethod('Tehran');
							} else if (value === 'Turkey') {
								setMethod('Turkey');
							} else if (value === 'Other') {
								setMethod('Other');
							}
						}}
						value={method || 'MuslimWorldLeague'}
					>
						<SelectTrigger className='col-span-3'>
							<SelectValue placeholder={method} />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Method</SelectLabel>
								<SelectItem value='Karachi'>Karachi</SelectItem>
								<SelectItem value='MuslimWorldLeague'>Muslim World League</SelectItem>
								<SelectItem value='Egyptian'>Egyptian</SelectItem>
								<SelectItem value='UmmAlQura'>Umm Al-Qura</SelectItem>
								<SelectItem value='Dubai'>Dubai</SelectItem>
								<SelectItem value='Kuwait'>Kuwait</SelectItem>
								<SelectItem value='Qatar'>Qatar</SelectItem>
								<SelectItem value='Singapore'>Singapore</SelectItem>
								<SelectItem value='Tehran'>Tehran</SelectItem>
								<SelectItem value='Turkey'>Turkey</SelectItem>
								<SelectItem value='Other'>Other</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div className='grid grid-cols-4 items-center gap-4'>
					<Label htmlFor='madhab' className='text-right'>
						Madhab:
					</Label>
					<Select
						onValueChange={(value) => {
							if (value === 'shafi') {
								setMadhab('shafi');
							} else if (value === 'hanafi') {
								setMadhab('hanafi');
							}
						}}
						value={madhab?.valueOf().toString()}
					>
						<SelectTrigger className='col-span-3'>
							<SelectValue placeholder={madhab} />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Madhab</SelectLabel>
								<SelectItem value='shafi'>Shafi</SelectItem>
								<SelectItem value='hanafi'>Hanafi</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<div className='grid grid-cols-4 items-center gap-4'>
					<Label htmlFor='fajrAngle' className='text-right'>
						Fajr Angle:
					</Label>
					<Input
						type='number'
						value={fajrAngle || 0}
						onChange={(event) => setFajrAngle(event.target.valueAsNumber)}
						id='longitude'
						className='col-span-3'
					/>
				</div>
				<div className='grid grid-cols-4 items-center gap-4'>
					<Label htmlFor='maghribAngle' className='text-right'>
						Maghrib Angle:
					</Label>
					<Input
						type='number'
						value={maghribAngle || 0}
						onChange={(event) => setMaghribAngle(event.target.valueAsNumber)}
						id='longitude'
						className='col-span-3'
					/>
				</div>

				<div className='grid grid-cols-4 items-center gap-4'>
					<Label htmlFor='ishaAngle' className='text-right'>
						Isha Angle:
					</Label>
					<Input
						type='number'
						value={ishaAngle || 0}
						onChange={(event) => setIshaAngle(event.target.valueAsNumber)}
						id='longitude'
						className='col-span-3'
					/>
				</div>
				<div className='grid grid-cols-4 items-center gap-4'>
					<Label htmlFor='ishaInterval' className='text-right'>
						Isha Interval:
					</Label>
					<Input
						type='number'
						value={ishaInterval || 0}
						onChange={(event) => setIshaInterval(event.target.valueAsNumber)}
						id='longitude'
						className='col-span-3'
					/>
				</div>
			</CardContent>
		</Card>
	);
};
