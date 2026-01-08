import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// We removed the @tailwindcss/vite import because it's causing the crash
export default defineConfig({
  plugins: [react()],
})
