import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'global': {},
  },
  server: {
    proxy: {
      '/api': {
        target:
          'http://ec2-54-180-109-193.ap-northeast-2.compute.amazonaws.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})

