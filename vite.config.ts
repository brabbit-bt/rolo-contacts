import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  preview: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: ['rolo-contacts.onrender.com', '.onrender.com']
  }
}) 