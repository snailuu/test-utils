import { defineConfig } from "tsup"
 
export default defineConfig({
  entry: ["./src/index.ts"],
  clean: true,
  outDir: "miniprogram_dist",
  dts: true,
  minify: true, // 开启压缩选项
  format: ["iife"],
  target: "es5",
  noExternal: ["@noble/curves"],
  tsconfig: "tsconfig.json",
  esbuildOptions(options) {
    if (options.define) {
      options.define.__BUILD_TS__ = Date.now().toString()
      options.define.import = "require"
    }
    options.globalName = "Base64Utility" // 将您的方法暴露到全局作用域
    options.supported = {
      "dynamic-import": false,
    }
  },
})


