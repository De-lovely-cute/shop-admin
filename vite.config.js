import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import WindiCSS from "vite-plugin-windicss";

import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    WindiCSS()
  ],
  resolve: {
    // 配置路径别名
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://ceshi13.dishait.cn/admin',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
