import { Procedures } from '@/utils/bindings.js';
import { createClient } from '@rspc/client';
import { TauriTransport } from '@rspc/tauri';

export const client = createClient<Procedures>({
	transport: new TauriTransport(),
});
