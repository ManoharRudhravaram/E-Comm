import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {
    // Proxy all requests to the main URL
    '/': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      // rewrite: path => path // Optionally, you can rewrite the path if needed
    }
  }
})
