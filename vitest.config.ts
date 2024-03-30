import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['**/__tests__/*.spec.[tj]s'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    testTimeout: 20000,
    // reporters: ['verbose'],
  },
  esbuild: {
    target: 'node18',
  },
  publicDir: false,
})
