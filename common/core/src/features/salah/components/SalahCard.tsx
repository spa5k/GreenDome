export const SalahCard = ({ prayer, time }: { prayer: string; time: Date; }) => {
	return (
		<div className='mx-auto' key={prayer}>
			<div className='m-3 flex  w-40  items-center justify-center rounded-lg py-3 font-bold  shadow-md'>
				<p className='mx-2 font-bold'>{prayer} :</p>
				{time.toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: '2-digit' })}
			</div>
		</div>
	);
};
