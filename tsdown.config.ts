import { defineConfig, type UserConfig } from "tsdown"

const tsDownConfig: UserConfig = defineConfig({
  entry: ["./src/nepali-number.ts"],
  outDir: "./dist",
  platform: "node",
  dts: true,
  shims: true,
  format: ["esm", "cjs", "iife", "umd"],
  outputOptions: (options) => {
    options.name = "nepaliNumber"

    return options
  },
  minify: true,
  clean: true,
})

export default tsDownConfig
