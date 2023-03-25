import react from '@vitejs/plugin-react';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Unfonts from 'unplugin-fonts/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
	plugins: [
		react(),
		checker({ typescript: false, eslint: { lintCommand: 'eslint "./src/**/*.{ts,tsx}"' }, overlay: { initialIsOpen: false } }),
		svgr(),
		Icons({
			compiler: 'jsx',
		}),
		Unfonts({
			google: {
				families: ['Rubik', 'Viga', 'Antic Slab'],
			},
			custom: {
				families: [{
					name: 'Readex Pro',
					local: 'Readex Pro',
					src: 'public/fonts/readex/*.ttf',
				}, {
					name: 'Uthmanic',
					local: 'Uthmanic',
					src: 'public/fonts/hafs_uthmanic_v14_full/*',
				}],
				display: 'auto',
				preload: true,
				prefetch: false,
				injectTo: 'body',
			},
		}),
		AutoImport({
			imports: ['vitest', 'ahooks', 'react'],
			dirs: [
				'./src/utils/**',
				'./src/features/**',
				'./src/screens/**',
				'./src/stores/*',
				'./src/components/**',
				'./src/providers/**',
				'./src/components/Elements/**',
			],
			dts: './src/auto-import.d.ts',
			defaultExportByFilename: true,
			resolvers: [
				IconsResolver({
					prefix: 'Icon',
					extension: 'tsx',
				}),
			],
			include: [
				/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
				/\.md$/, // .md
			],
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
