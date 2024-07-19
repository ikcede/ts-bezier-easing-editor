import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import dts from 'vite-plugin-dts'

export default defineConfig({
  base: '',
  root: '.',
  plugins: [
    react(),
    viteTsconfigPaths(),
    dts({
      exclude: [
        '**/stories',
        '**/test',
      ],
      insertTypesEntry: true,
      rollupTypes: true,
    })
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: 'src/components/index.ts',
      formats: ['es'],
    },
    outDir: 'dist',
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: 'main.js',
      }
    }
  },
})