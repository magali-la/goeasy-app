import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],

  // dummy proxy ONLY for development
  server: {
    proxy: {
      // /api routes
      '/api': {
        target: 'http://localhost:4001',
        changeOrigin: true,
        secure: false
      },
      // /auth routes
      '/auth': {
        target: 'http://localhost:4001',
        changeOrigin: true,
        secure: false
      },
    }
  }
})
