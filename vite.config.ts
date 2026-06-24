import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { seoPlugin } from './seo'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/simplepasswordgenerator/',
  plugins: [react(), seoPlugin()],
})
