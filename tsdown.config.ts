import { defineConfig } from "tsdown"

export default defineConfig({
  entry: ["./src/index.ts"],
  outDir: "./dist",
  platform: "node",
  dts: true,
  shims: true,
  format: ["esm", "cjs", "iife", "umd"],
  minify: true,
  clean: true,
})
