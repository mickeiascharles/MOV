import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    root: ".",
    setupFiles: "./vitest.setup.js",
    poolOptions: { threads: { singleThread: true } },
  },
});
