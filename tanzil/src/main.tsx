import { createRoot } from 'react-dom/client';
import './main.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const app = createRoot(document.getElementById('app')!);

app.render(
	<AppProvider />,
);
