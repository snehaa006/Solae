import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Lightning CSS (Vite's default CSS minifier) folds `translate` into `transform` when a rule
    // has both, and drops it outright when `translate` comes first. Our styles use the two
    // together on purpose (centring plus a scale or a nudge), so ship the CSS unminified.
    cssMinify: false,
  },
})
