import { Outlet } from '@tanstack/react-router';

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
