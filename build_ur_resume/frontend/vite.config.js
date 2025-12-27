import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    host: true,           // listen on 0.0.0.0 so container ports map correctly
    port: 5173,
    strictPort: false,
    proxy: {
      // forward /api/* requests to the backend service on the Docker network
      '/api': {
        target: 'http://web:8000', // change 'web' to your backend service name if different
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  },
  // Vite will only expose env vars starting with VITE_
  envPrefix: 'VITE_'
})
