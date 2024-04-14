import { defineConfig } from 'vite'

export default defineConfig({
  base: '/2d-game/',
  build: {
    minify: 'terser'
  }
})
