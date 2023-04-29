import EnvironmentContextProvider from '@/providers/EnvironmentProvider';
import '@/styles/globals.css';
import { MainLayout } from '@quran/core';
import '@quran/elements/src/styles/globals.css';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<EnvironmentContextProvider>
					<MainLayout>
						<Component {...pageProps} />
					</MainLayout>
				</EnvironmentContextProvider>
			</Hydrate>
			<ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
		</QueryClientProvider>
	);
}
