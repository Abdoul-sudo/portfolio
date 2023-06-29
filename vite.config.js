import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000 * 1024, // Définissez la limite de taille en octets (ici, 1 Mo)
    outDir: 'dist',
  },
});
