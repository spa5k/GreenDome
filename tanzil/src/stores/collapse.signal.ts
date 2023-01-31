import type { Signal } from '@preact/signals-react';
import { signal } from '@preact/signals-react';

export const leftSideBarCollapseSignal: Signal<boolean> = signal<boolean>(false);
