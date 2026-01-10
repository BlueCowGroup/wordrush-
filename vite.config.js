import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default defineConfig({
  plugins: [solidPlugin()],
  base: process.env.GITHUB_ACTIONS ? '/wordrush-/' : '/',
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
