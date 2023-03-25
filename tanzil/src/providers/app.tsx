import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Routes } from 'generouted/react-location';
import { StrictMode, Suspense } from 'react';
import { themeChange } from 'theme-change';

const queryClient = new QueryClient();

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
				<QueryClientProvider client={queryClient}>
					<Routes />
					<ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
				</QueryClientProvider>
			</Suspense>
		</StrictMode>
	);
};
