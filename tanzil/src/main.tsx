import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'jotai';
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';

import routes from '~react-pages';

function App() {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			{useRoutes(routes)}
		</Suspense>
	);
}

const queryClient = new QueryClient();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const app = createRoot(document.getElementById('root')!);

app.render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<Provider>
				<Router>
					<App />
				</Router>
			</Provider>
		</QueryClientProvider>
	</StrictMode>,
);

// export default app;
