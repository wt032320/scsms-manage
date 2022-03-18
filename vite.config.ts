import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/style/mian.scss";',
      },
    },
  },
  // 配置别名
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  //启动服务配置
  server: {
    host: "192.168.0.1",
    port: 8000,
    open: true,
    https: false,
    proxy: {},
  },
});
