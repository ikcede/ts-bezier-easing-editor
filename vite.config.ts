import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'

/**
 * Default config file for running vite dev server on /example
 */
export default defineConfig({
  base: '',
  plugins: [
    react(),
    viteTsconfigPaths(),
  ],
  server: {    
    open: true,
    port: 3000,
  },
  root: './example',
  publicDir: './public',
})