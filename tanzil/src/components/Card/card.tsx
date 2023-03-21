export const SalahCard = ({ prayer, time }: { prayer: string; time: Date; }) => {
	return (
		<div className="mx-auto">
		<div className='bg-secondary text-primary m-3  flex  w-40 items-center justify-center rounded-lg py-2  shadow-md' key={prayer}>
			<p className='mx-2 text-lg font-bold'>{prayer} :</p>
			{time.toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: '2-digit' })}
		</div>
		</div>
	);
};
