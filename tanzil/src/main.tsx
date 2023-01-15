import { Routes } from 'generouted/react-location';
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const app = createRoot(document.getElementById('app')!);

app.render(
	<StrictMode>
		<Suspense fallback={<p>Loading...</p>}>
			<Routes />
		</Suspense>
	</StrictMode>,
);
