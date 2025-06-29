import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      '5173-itu4kgen0emjjkw92wzfe-f7080b1c.manusvm.computer',
      'localhost',
      '127.0.0.1',
    ],
  },
})


