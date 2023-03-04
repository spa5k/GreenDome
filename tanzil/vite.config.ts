import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';
import { VitePluginFonts } from 'vite-plugin-fonts';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
	plugins: [
		// react({ jsxImportSource: 'signia-react-jsx' }),
		// mkcert({
		// 	mkcertPath: '/usr/local/bin/mkcert',
		// }),
		checker({ typescript: false, eslint: { lintCommand: 'eslint "./src/**/*.{ts,tsx}"' }, overlay: { initialIsOpen: false } }),
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
	optimizeDeps: {
		include: ['generouted/react-location'],
		extensions: ['.jsx', '.tsx'],
	},
});
