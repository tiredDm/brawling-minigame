import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/brawling-minigame/',
  build: {
    chunkSizeWarningLimit: 1600,
  },
})