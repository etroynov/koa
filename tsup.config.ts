import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/application.ts'],
  format: ['cjs', 'esm'],
  target: 'es2022',
  dts: true,
  clean: true
})
