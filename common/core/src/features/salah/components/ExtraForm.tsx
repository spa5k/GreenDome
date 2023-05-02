import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
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

export const ExtraSettingsForm = () => {
	const {
		setHighLatitudeRule,
		highLatitudeRule,
		polarCircleResolution,
		rounding,
		setPolarCircleResolution,
		setRounding,
		setShafaq,
		shafaq,
	} = useSalahTrackedStore();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Extra</CardTitle>
				<CardDescription>
					Optional Settings, NOT RECOMMENDED TO CHANGE
				</CardDescription>
			</CardHeader>
			<CardContent className='space-y-2'>
				<div className='grid grid-cols-4 items-center gap-7'>
					<Label htmlFor='highLatitudeRule' className='text-right'>
						High Latitude Rule:
					</Label>
					<Select
						onValueChange={(value) => {
							if (value === 'middleofthenight') {
								setHighLatitudeRule('middleofthenight');
							} else if (value === 'seventhofthenight') {
								setHighLatitudeRule('seventhofthenight');
							} else if (value === 'twilightangle') {
								setHighLatitudeRule('twilightangle');
							} else if (value === 'none') {
								setHighLatitudeRule(null);
							}
						}}
						value={highLatitudeRule?.valueOf().toString() || 'middleofthenight'}
					>
						<SelectTrigger className='col-span-3'>
							<SelectValue placeholder={highLatitudeRule?.valueOf().toString() || 'None'} />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>High Latitude Rule</SelectLabel>
								<SelectItem value='middleofthenight'>Middle of the Night</SelectItem>
								<SelectItem value='seventhofthenight'>Seventh of the Night</SelectItem>
								<SelectItem value='twilightangle'>Twilight Angle</SelectItem>
								<SelectItem value='none'>None</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div className='grid grid-cols-4 items-center gap-7'>
					<Label htmlFor='polarCircleResolution' className='text-right'>
						Polar Circle Resolution:
					</Label>
					<Select
						onValueChange={(value) => {
							if (value === 'AqrabBalad') {
								setPolarCircleResolution('AqrabBalad');
							} else if (value === 'AqrabYaum') {
								setPolarCircleResolution('AqrabYaum');
							} else if (value === 'Unresolved') {
								setPolarCircleResolution('Unresolved');
							} else if (value === 'none') {
								setPolarCircleResolution(null);
							}
						}}
						value={polarCircleResolution?.valueOf()?.toString() || 'none'}
						defaultValue='none'
					>
						<SelectTrigger className='col-span-3'>
							<SelectValue placeholder={polarCircleResolution?.valueOf()?.toString() || 'None'} />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Polar Circle Resolution</SelectLabel>
								<SelectItem value='AqrabBalad'>Aqrab Balad</SelectItem>
								<SelectItem value='AqrabYaum'>Aqrab Yaum</SelectItem>
								<SelectItem value='Unresolved'>Unresolved</SelectItem>
								<SelectItem value='none'>None</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div className='grid grid-cols-4 items-center gap-4'>
					<Label htmlFor='rounding' className='text-right'>
						Rounding:
					</Label>
					<Select
						onValueChange={(value) => {
							if (value === 'nearest') {
								setRounding('nearest');
							} else if (value === 'up') {
								setRounding('up');
							} else if (value === 'none') {
								setRounding('none');
							}
						}}
						value={rounding?.toString() || 'none'}
					>
						<SelectTrigger className='col-span-3'>
							<SelectValue placeholder={rounding?.toString() || 'none'} />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Rounding</SelectLabel>
								<SelectItem value='nearest'>Nearest</SelectItem>
								<SelectItem value='up'>Up</SelectItem>
								<SelectItem value='none'>None</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<div className='grid grid-cols-4 items-center gap-4'>
					<Label htmlFor='shafaq' className='text-right'>
						Shafaq:
					</Label>
					<Select
						onValueChange={(value) => {
							if (value === 'general') {
								setShafaq('general');
							} else if (value === 'ahmer') {
								setShafaq('ahmer');
							} else if (value === 'abyad') {
								setShafaq('abyad');
							} else if (value === 'none') {
								setShafaq(null);
							}
						}}
						value={shafaq?.valueOf()?.toString() || 'none'}
						defaultValue='none'
					>
						<SelectTrigger className='col-span-3'>
							<SelectValue placeholder={shafaq?.valueOf()?.toString()} />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Shafaq</SelectLabel>
								<SelectItem value='general'>General</SelectItem>
								<SelectItem value='ahmer'>Ahmer</SelectItem>
								<SelectItem value='abyad'>Abyad</SelectItem>
								<SelectItem value='none'>None</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</CardContent>
		</Card>
	);
};
