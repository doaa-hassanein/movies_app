import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/movies_app/', 
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  }
})