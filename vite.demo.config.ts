import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// Demo配置 - 用于构建演示应用
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  base: '/tiptap-vue-editor/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})

