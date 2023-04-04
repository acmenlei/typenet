import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import commonjs from "@rollup/plugin-commonjs"
import terser from "@rollup/plugin-terser"
import postcss from "rollup-plugin-postcss"

export default [
  {
    input: "./index.ts",
    output: {
      dir: "dist/dev",
      format: "esm",
      entryFileNames: "typenet.esm.js",
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript(),
      postcss({
        extract: true,
        minimize: false,
      }),
    ],
  },
  {
    input: "./index.ts",
    output: {
      dir: "dist/prod",
      format: "esm",
      entryFileNames: "typenet.esm.js",
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript(),
      terser(),
      postcss({
        extract: true,
        minimize: true,
      }),
    ],
  },
]
