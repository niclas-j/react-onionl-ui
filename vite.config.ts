import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const stubAssets = {
  name: 'stub-assets',
  resolveId(id) { return /\.(svg|png|jpe?g|gif|webp|avif|ico|woff2?|ttf|eot)(\?.*)?$/.test(id) ? '\0asset:' + id : null; },
  load(id) { return id.startsWith('\0asset:') ? 'export default "";' : null; },
};

export default defineConfig({
  plugins: [react(), stubAssets],
  resolve: {
    alias: [
      { find: new RegExp("^@onionl-ui/components"), replacement: fileURLToPath(new URL('.//', import.meta.url)) },
      { find: new RegExp("^@onionl-ui/"), replacement: fileURLToPath(new URL('./packages/', import.meta.url)) },
      { find: new RegExp("^onionl-ui"), replacement: fileURLToPath(new URL('.//', import.meta.url)) },
      { find: /^src\//, replacement: fileURLToPath(new URL('./src/', import.meta.url)) },
    ],
    extensions: ['.mjs','.js','.mts','.ts','.jsx','.tsx','.json'],
  },
  test: { setupFiles: ["./src/test-setup/jest-dom-setup.ts"], environment: 'happy-dom', globals: true, exclude: ['**/node_modules/**', '**/dist/**', '**/.{idea,git,cache,output,temp}/**'], css: { modules: { classNameStrategy: 'non-scoped' } } },
});
