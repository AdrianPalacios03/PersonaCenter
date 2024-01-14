import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import plugin from '@stylexjs/rollup-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    plugin({
      dev: true,
    })
  ],
})
