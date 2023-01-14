import react from '@vitejs/plugin-react-swc';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';
import { VitePluginFonts } from 'vite-plugin-fonts';
import Pages from 'vite-plugin-pages';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
	plugins: [
		react(),
		Pages(),
		checker({ typescript: true, eslint: { lintCommand: 'eslint "./src/**/*.{ts,tsx}"' } }),
		svgr(),
		Icons({ autoInstall: true, compiler: 'jsx', jsx: 'react', defaultClass: 'icon' }),
		VitePluginFonts({
			google: {
				families: ['Rubik', 'Viga', 'Antic Slab'],
			},
			custom: {
				families: [{
					name: 'Readex',
					local: 'Readex',
					src: 'public/fonts/readex/*.ttf',
				}],
				display: 'auto',
				preload: true,
				prefetch: false,
				injectTo: 'head-prepend',
			},
		}),
		AutoImport({
			include: [
				/\.[tj]sx?$/,
				/\.md$/,
			],
			imports: ['vitest', 'react-router-dom', 'ahooks', 'react'],
			dirs: ['./src/utils', './src/features/**', './src/screens/**', './src/stores/**', './src/utils/*'],
			dts: './src/auto-import.d.ts',
		}),
	],
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
