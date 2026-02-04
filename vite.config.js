import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { compression } from 'vite-plugin-compression2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Brotli compression (better than gzip)
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 1024, // Only compress files > 1KB
      compressionOptions: {
        level: 11, // Maximum compression
      },
    }),
    // Gzip compression as fallback
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 1024,
    }),
  ],
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 800,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Minify CSS
    cssMinify: true,
    // Disable source maps for smaller bundles
    sourcemap: false,
    // Report compressed size
    reportCompressedSize: true,
  },
  // Include additional asset types
  assetsInclude: ['**/*.glb', '**/*.webp', '**/*.avif'],
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    exclude: ['three', '@react-three/fiber', '@react-three/drei'],
  },
})
