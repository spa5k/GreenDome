import { observable } from '@legendapp/state';
import { persistObservable } from '@legendapp/state/persist';

export const Theme = observable({
	theme: 'default',
});

// Persist state
persistObservable(Theme, {
	local: 'theme',
});
