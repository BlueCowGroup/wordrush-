import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

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
