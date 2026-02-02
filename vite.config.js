import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { compression } from 'vite-plugin-compression2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Standard Gzip compression
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/],
    }),
  ],
  build: {
    // Rolldown handles minification internally, removing terser to avoid conflicts
    // Removing complex rollupOptions.output as Rolldown (experimental) might not support them fully yet
    target: 'es2020',
    chunkSizeWarningLimit: 800,
  },
  // Include additional asset types
  assetsInclude: ['**/*.glb', '**/*.webp', '**/*.avif'],
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    exclude: ['three', '@react-three/fiber', '@react-three/drei'],
  },
})
