import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  base: '',
  plugins: [react(), viteTsconfigPaths()],
  server: {    
    open: true,
    port: 3000, 
  },
  root: './example',
  publicDir: './public',
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'src/components/index.ts'),
      formats: ['es'],
    },
    outDir: resolve(__dirname, './dist'),
    emptyOutDir: true,
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: 'main.js',
      }
    }
  },
})