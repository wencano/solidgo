import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import path from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

export default defineConfig({
  root: rootDir,
  resolve: {
    // Ensure node_modules resolution works from vite-solid
    preserveSymlinks: false,
    // Explicitly resolve node_modules from vite-solid directory
    alias: {
      'solid-js': path.resolve(__dirname, 'node_modules/solid-js'),
      'solid-js/web': path.resolve(__dirname, 'node_modules/solid-js/web'),
      '@kobalte/core': path.resolve(__dirname, 'node_modules/@kobalte/core'),
      'solid-ui': path.resolve(__dirname, 'node_modules/solid-ui'),
    },
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss({
          config: path.resolve(__dirname, 'tailwind.config.js'),
        }),
        autoprefixer(),
      ],
    },
  },
  plugins: [solid()],
  build: {
    rollupOptions: {
      input: {
        'notifications-dropdown': path.resolve(rootDir, 'src/navbar.tsx'),
        'dashboard': path.resolve(rootDir, 'src/dashboard-index.tsx'),
        'entities-list': path.resolve(rootDir, 'src/entities-list.tsx'),
        'entities-new': path.resolve(rootDir, 'src/entities-new.tsx'),
        'entities-edit': path.resolve(rootDir, 'src/entities-edit.tsx'),
        'entities-view': path.resolve(rootDir, 'src/entities-view.tsx'),
      },
      output: {
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    outDir: path.resolve(rootDir, 'static'),
    emptyOutDir: false,
    cssCodeSplit: false,
  },
});

