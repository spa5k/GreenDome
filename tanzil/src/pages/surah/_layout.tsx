import { Outlet } from '@tanstack/react-location';

export const Loader = () => {
	return Promise.resolve({ source: 'from `src/pages/surah.tsx` layout data loader' });
};

export default function SurahLayout() {
	return (
		<>
			<Outlet />
		</>
	);
}
