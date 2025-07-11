import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

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
      '@renderer': resolve('src/renderer/src')
    }
  }
})
