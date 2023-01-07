import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { TailwindCSSVitePlugin } from 'tailwindcss-vite-plugin';
import AutoImport from 'unplugin-auto-import/vite';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';
import Pages from 'vite-plugin-pages';
import svgr from 'vite-plugin-svgr';
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		Pages(),
		TailwindCSSVitePlugin({ entry: './src/main.css' }),
		checker({ typescript: true, eslint: { lintCommand: 'eslint "./src/**/*.{ts,tsx}"' } }),
		svgr(),
		Icons({ autoInstall: true, compiler: 'jsx', jsx: 'react', defaultClass: 'icon' }),
		AutoImport({
			include: [
				/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
				/\.md$/, // .md
			],
			imports: ['vitest', 'react-router-dom', 'ahooks', 'react'],
			dirs: ['./src/utils', './src/features/**'],
			eslintrc: {
				enabled: true,
			},
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
