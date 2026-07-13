import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite is the build tool: it runs the dev server locally and bundles
// the app into plain HTML/JS/CSS that Vercel can host.
export default defineConfig({
  plugins: [react()],
})
