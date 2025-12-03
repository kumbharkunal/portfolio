import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split React libraries into separate chunk
          'react-vendor': ['react', 'react-dom'],
          // Split animation libraries
          'animation-vendor': ['framer-motion', 'gsap', 'lenis'],
          // Split UI component libraries
          'ui-vendor': ['react-fast-marquee', 'react-parallax-tilt', 'react-simple-typewriter', 'react-github-calendar']
        }
      }
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize chunk size
    chunkSizeWarningLimit: 500,
    // No source maps in production
    sourcemap: false
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion']
  }
})
