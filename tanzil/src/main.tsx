import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'jotai';
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import '_tailwind-devtools_.js';
import routes from '~react-pages';
import './main.css';

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
			<RspcProvider client={client} queryClient={queryClient}>
				<Provider>
					<ReactQueryDevtools initialIsOpen={false} />
					<App />
				</Provider>
			</RspcProvider>
		</BrowserRouter>
	</StrictMode>,
);
