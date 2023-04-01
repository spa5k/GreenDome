export const AyahTextViewer = (text: string) => {
	return (
		<div className='
			flex
			h-screen
			grow
		'>
			<p className='leading-7 [&:not(:first-child)]:mt-6'>
				{text}
			</p>
		</div>
	);
};
