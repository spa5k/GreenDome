export default function MainContent() {
	function getHijriDate(): import('react').ReactNode {
		throw new Error('Function not implemented.');
	}

	return (
		<div className='h-full grow'>
			<p className='text-center'>This is Main Content</p>
			<p className='text-center'>Assalamualaikum, today is {getHijriDate()}</p>
		</div>
	);
}
