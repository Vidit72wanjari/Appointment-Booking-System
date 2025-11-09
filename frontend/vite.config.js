import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // For development, we'll use the serverless functions in the api folder
    // These will be handled by Vercel CLI when deployed
  }
})