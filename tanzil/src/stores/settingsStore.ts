import { atom } from 'signia';

type TanzilSettingsState = {
	translation: string;
};

class TanzilSettings {
	private readonly _state = atom<TanzilSettingsState>('TextDocument._state', {
		translation: 'My Document',
	});
	get state() {
		return this._state.value;
	}

	setCursor(position: number) {
		this._state.update((state) => {
			return {
				...state,
				cursorPosition: position,
			};
		});
	}

	setSelectionRange(range: [number, number]) {
		this._state.update((state) => {
			return {
				...state,
				selectionRange: range,
			};
		});
	}
}
