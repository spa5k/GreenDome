import path from 'path';
import { defineConfig } from 'vite';
import Pages from 'vite-plugin-pages';
import solidPlugin from 'vite-plugin-solid';

// vite-env.d.ts
/// <reference types="vite-plugin-pages/client-solid" />
export default defineConfig({
	plugins: [solidPlugin(), Pages()],
	server: {
		port: 3000,
	},
	build: {
		target: 'esnext',
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
