export const SalahCard = ({ prayer, time }: { prayer: string; time: Date; }) => {
	return (
		<div className='m-2 mx-auto'>
			<div className='bg-secondary text-primary flex w-40  items-center justify-center rounded-lg  py-2  shadow-md' key={prayer}>
				<p className='text-lg font-bold'>{prayer} </p>
				<p className="text-lg font-bold"> : {time.toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: '2-digit' })}</p>
			</div>
		</div>
	);
};
