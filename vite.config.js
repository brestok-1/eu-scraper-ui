import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

export default defineConfig({
  base: 'https://brestok-1.github.io/eu-scraper-ui',
  plugins: [react(), tailwind()],
})
