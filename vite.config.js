import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid()],
  build: {
    rollupOptions: {
      input: {
        'notifications-dropdown': './src/navbar.tsx',
        'dashboard': './src/dashboard-index.tsx',
        'entities-list': './src/entities-list.tsx',
        'entities-new': './src/entities-new.tsx',
        'entities-edit': './src/entities-edit.tsx',
        'entities-view': './src/entities-view.tsx',
      },
      output: {
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    outDir: 'static',
    emptyOutDir: false,
    cssCodeSplit: false,
  },
});

