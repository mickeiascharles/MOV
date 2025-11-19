import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // 1. ADICIONE ESTA CONFIGURAÇÃO
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js", // (Vamos criar este arquivo)
  },
});
