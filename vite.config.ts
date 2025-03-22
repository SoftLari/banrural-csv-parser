import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "BanruralCsvParser",
      fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["fs", "csv-parse", "csv-stringify"],
    },
    sourcemap: true,
    minify: false,
  },
  plugins: [
    dts({
      rollupTypes: true,
      include: ["src"],
      logLevel: "warn",
      tsconfigPath: "tsconfig.json",
      compilerOptions: {
        skipLibCheck: true,
      },
    }),
  ],
});
