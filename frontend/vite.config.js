import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/faqs': 'http://localhost:5000',
      '/translate': 'http://localhost:5000', // If you have a translate endpoint
      // Add more proxies as needed
    },
  },
});
