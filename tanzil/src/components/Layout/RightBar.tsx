import { useLocation } from '@tanstack/react-location';

export default function RightBar() {
	// Get current page from the URL using react-location
	const location = useLocation();

	console.log(location.current.pathname);
	return (
		<div className='h-full basis-1/4'>
			<p>This is the right bar</p>
		</div>
	);
}
