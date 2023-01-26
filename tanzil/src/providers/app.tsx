import { ErrorBoundary } from 'react-error-boundary';

import { Routes } from 'generouted/react-location';
import { StrictMode, Suspense } from 'react';
import { themeChange } from 'theme-change';

const ErrorFallback = () => {
	return (
		<div
			className='bg-error w-screen h-screen flex flex-col justify-center items-center'
			role='alert'
		>
			<h2 className='text-lg font-semibold text-primary'>Ooops, something went wrong :(</h2>
			<Button className='mt-4 btn' onClick={() => window.location.assign(window.location.origin)}>
				Refresh
			</Button>
		</div>
	);
};

export const AppProvider = () => {
	useEffect(() => {
		themeChange(false);
	}, []);

	return (
		<StrictMode>
			<Suspense
				fallback={
					<div className='flex items-center justify-center w-screen h-screen'>
						<Spinner size='xl' />
					</div>
				}
			>
				<ErrorBoundary FallbackComponent={ErrorFallback}>
					<Routes />
				</ErrorBoundary>
			</Suspense>
		</StrictMode>
	);
};
