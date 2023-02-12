// import { Routes } from 'generouted/react-location';
import { StrictMode, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { themeChange } from 'theme-change';
import { Routes } from '../routes.gen.js';

const queryClient = new QueryClient();

const TanStackRouterDevtools = process.env.NODE_ENV === 'production'
	? () => null // Render nothing in production
	: lazy(() =>
		// Lazy load in development
		import('@tanstack/react-router-devtools').then((res) => ({
			default: res.TanStackRouterDevtools,
			// For Embedded Mode
			// default: res.TanStackRouterDevtoolsPanel
		}))
	);

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
