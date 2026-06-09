import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/e-commerce-react/',
  server: {
    port: 4173,
    open: true
  }
});
