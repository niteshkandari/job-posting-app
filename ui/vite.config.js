import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base:"https://job-posting-app-usinasd.netlify.app/",
  plugins: [react()],
  define: {
    'process.env': {}
  }
})
