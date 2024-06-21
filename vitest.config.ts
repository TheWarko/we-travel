import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@Components': path.resolve(__dirname, 'src/components'),
    },
  },
  test: {
    environment: 'happy-dom',
  },
});
