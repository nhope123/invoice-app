import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/renderer/src/utils/test/vitest-setup.tsx',
    css: true,
    include: ['src/renderer/src/**/*.test.tsx', 'src/renderer/src/**/*.test.ts']
  },
  resolve: {
    alias: {
      '@renderer': resolve(__dirname, 'src/renderer/src')
    }
  }
})
