import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'virtual:fonts.css';
import routes from '~react-pages';
import './index.css';

function App() {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<ReactQueryDevtools initialIsOpen={false} />
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
				<App />
			</RspcProvider>
		</BrowserRouter>
	</StrictMode>,
);
