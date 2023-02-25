export const SalahCard = ({ prayer, time }: { prayer: string; time: Date; }) => {
	return (
		<div className='bg-secondary text-primary flex w-40 flex-col items-center justify-center rounded-lg px-4 py-6 shadow-md' key={prayer}>
			<p className='mb-4 text-lg font-bold'>{prayer}</p>
			{time.toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: '2-digit' })}
		</div>
	);
};
