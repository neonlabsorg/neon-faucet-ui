import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from 'vite-plugin-commonjs';
import svgr from 'vite-plugin-svgr';
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import vitetsConfigPaths from 'vite-tsconfig-paths';
import sass from 'sass'
import dynamicImport from 'vite-plugin-dynamic-import'

const config = defineConfig({
  base: './',
  plugins: [
    svgr({
      include: [
        'src/assets/**/*.svg',
      ],
    }),
    react(),
    dynamicImport(),
    vitetsConfigPaths(),
    nodePolyfills({ include: ['fs', 'stream', 'buffer', 'util', 'http', 'https'] }),
    commonjs()
  ],
  css: {
    preprocessorOptions: {
        scss: { implementation: sass }
    }
  },
  server: {
    open: true, // automatically open the app in the browser
    port: 3000,
  },
  resolve: {
    alias: {
     '@': path.resolve(__dirname, './src'),
      'token-list': '/node_modules/token-list',
    //   screens: path.resolve(__dirname, './src/screens'),
    },
  },
  build: {
    outDir: 'build',
  },
});

export default config;
