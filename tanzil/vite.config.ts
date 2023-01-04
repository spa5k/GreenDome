import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import Pages from 'vite-plugin-pages';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), Pages()],
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
