import '@quran/elements/src/styles/globals.css';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AppProvider } from './providers/app';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<AppProvider />,
);
