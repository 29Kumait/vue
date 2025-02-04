import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import viteCompression from 'vite-plugin-compression'
import helmet from 'helmet'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    viteCompression(),
    helmet()
  ],

  ssr: {
    noExternal: ['pinia', 'vue-router']
  }
})
