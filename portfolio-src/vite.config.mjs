import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://raviranjanprasad.vercel.app',
      exclude: ['/googled765d8e40f0f99af'],
    }),
  ],
  publicDir: 'Public',
});
