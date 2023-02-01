import { Routes } from 'generouted/react-location';
import { StrictMode, Suspense } from 'react';
import { themeChange } from 'theme-change';

export const AppProvider = () => {
	useEffect(() => {
		themeChange(false);
	}, []);

	return (
		<StrictMode>
			<Suspense
				fallback={
					<div className='flex h-screen w-screen items-center justify-center'>
						<Spinner size='xl' />
					</div>
				}
			>
				<Routes />
			</Suspense>
		</StrictMode>
	);
};
