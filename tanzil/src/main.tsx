import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'jotai';
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useRoutes } from 'react-router-dom';

import { client, queryClient, rspc } from '@/utils/rspc.js';
import routes from '~react-pages';

function App() {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			{useRoutes(routes)}
		</Suspense>
	);
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const app = createRoot(document.getElementById('root')!);

app.render(
	<StrictMode>
		<BrowserRouter>
			<rspc.Provider client={client} queryClient={queryClient}>
				<Provider>
					<ReactQueryDevtools initialIsOpen={false} />
					<App />
				</Provider>
			</rspc.Provider>
		</BrowserRouter>
	</StrictMode>,
);
