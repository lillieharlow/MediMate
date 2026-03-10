import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  test: {
    globals: true, // enables Jest-like syntax in Vitest test files
    environment: 'jsdom', // tells the test runner system (Vitest, Jest) to be ready to run browser-related code
    setupFiles: './tests/setupTests.js', // Perform any additional configuration before any tests run
  },
});
