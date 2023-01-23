import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
  },
  server: {
    proxy: {
      '/api': {
        target:
          'http://ec2-43-200-2-48.ap-northeast-2.compute.amazonaws.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // '/socket': {
      //   target: 'http://ec2-43-200-2-48.ap-northeast-2.compute.amazonaws.com',
      //   ws: true,
      //   changeOrigin: true,
      //   secure: false,
      //   rewrite: (path) => path.replace(/^\/socket/, ''),
      // }
    },
  },
});
