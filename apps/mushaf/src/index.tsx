/* @refresh reload */
import { render } from 'solid-js/web';
import './index.css';

import { Mushaf } from './App';

render(() => <Mushaf />, document.getElementById('root') as HTMLElement);
