import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    // 1. Make the dev server listen on all network interfaces
    host: '0.0.0.0',
    port: 5173, // match your local port

    // 2. Whitelist your ngrok domain (or use a pattern)
    allowedHosts: [
      '1682-2402-800-63b9-ee8f-2986-b716-287e-877f.ngrok-free.app'
      // or to allow any ngrok subdomain:
      // '.ngrok-free.app'
    ]
  }
})
