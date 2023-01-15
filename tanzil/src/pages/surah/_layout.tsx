import { Link, Outlet } from '@tanstack/react-location';

export const Loader = () => {
	return Promise.resolve({ source: 'from `src/pages/surah.tsx` layout data loader' });
};

export default function SurahLayout() {
	return (
		<>
			<h1>Surah Layout</h1>
			<Link to='/posts'>Posts Index</Link>

			<Outlet />
		</>
	);
}
