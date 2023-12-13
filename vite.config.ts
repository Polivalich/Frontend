import {defineConfig} from 'vite'

import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import basicSsl from '@vitejs/plugin-basic-ssl'
import path from 'path'

export default defineConfig({
	envDir: 'src/env',
	plugins: [
		react(),
		legacy({
			targets: ['defaults', 'not IE 11'],
		}),
		basicSsl(),
	],

	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@env': path.resolve(__dirname, './src/env'),
			'@components': path.resolve(__dirname, './src/components'),
			'@hooks': path.resolve(__dirname, './src/hooks'),
			'@store': path.resolve(__dirname, './src/store'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@http': path.resolve(__dirname, './src/http'),
			'@services': path.resolve(__dirname, './src/services'),
			'@models': path.resolve(__dirname, './src/models'),
			'@router': path.resolve(__dirname, './src/router'),
			'@helpers': path.resolve(__dirname, './src/helpers'),
			// '@assets': path.resolve(__dirname, './src/assets'),
			// '@pages': path.resolve(__dirname, './src/pages'),
			// '@styles': path.resolve(__dirname, './src/styles'),
			// '@store': path.resolve(__dirname, './src/store/'),
			// '@consts': path.resolve(__dirname, './src/consts/'),
		},
	},

	build: {
		outDir: './dist',
	},

	server: {
		hmr: {
			clientPort: 443,
		},
	},
})
