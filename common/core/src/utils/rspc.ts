import { Procedures } from './dbTypes';
import { isClient } from './isTauri';

export const client = async () => {
	if (!isClient) {
		return null;
	}

	const { createClient } = await import('@rspc/client');
	const { TauriTransport } = await import('@rspc/tauri');

	// dynamically import the client only if we're in the browser
	return createClient<Procedures>({
		transport: new TauriTransport(),
	});
};
