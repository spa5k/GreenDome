import react from '@vitejs/plugin-react';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';
import { VitePluginFonts } from 'vite-plugin-fonts';
import svgr from 'vite-plugin-svgr';

let typescript = true;

if (process.env.NODE_ENV === 'CI' || process.env.STORYBOOK === 'true' || process.env.NODE_ENV === 'production') {
	typescript = false;
}
console.log(typescript);
export default defineConfig({
	plugins: [
		react(),
		checker({ typescript, eslint: { lintCommand: 'eslint "./src/**/*.{ts,tsx}"' } }),
		svgr(),
		Icons({
			compiler: 'jsx',
		}),
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
			imports: ['vitest', 'ahooks', 'react'],
			dirs: ['./src/utils/**', './src/features/**', './src/screens/**', './src/stores/**', './src/components/**', './src/providers/**'],
			dts: './src/auto-import.d.ts',
			defaultExportByFilename: true,
			resolvers: [
				IconsResolver({
					prefix: 'Icon',
					extension: 'jsx',
				}),
			],
			include: [
				/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
				/\.vue$/,
				/\.vue\?vue/, // .vue
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
