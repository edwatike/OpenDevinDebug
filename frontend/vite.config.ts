import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import { visualizer } from 'rollup-plugin-visualizer';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import { lingui } from '@lingui/vite-plugin';
import { execSync } from 'child_process';

const commitHash = execSync('git rev-parse --short HEAD').toString().trim();

export default defineConfig({
  base: '/static/',
  plugins: [
    viteCommonjs(),
    react({
      babel: {
        plugins: ['macros'],
      },
    }),
    lingui(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'OpenHands',
        short_name: 'OpenHands',
        description: 'OpenHands',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
    viteSingleFile(),
    chunkSplitPlugin({
      strategy: 'unbundle',
    }),
    visualizer({
      emitFile: true,
      filename: 'stats.html',
    }),
  ],
  define: {
    __COMMIT_HASH__: JSON.stringify(commitHash),
  },
  resolve: {
    alias: {
      '#': resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'build',
    assetsDir: 'assets',
    sourcemap: true,
  },
  server: {
    port: 5173,
  },
});