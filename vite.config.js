import dotenv from 'dotenv';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr'

dotenv.config();
const { PORT = 3000, CLIENT_PORT = 3001 } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        // svgr options
      },
    })
  ],
  server: {
    port: CLIENT_PORT,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist/client',
  },

});
