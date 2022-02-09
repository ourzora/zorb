import svelte from "rollup-plugin-svelte";
import typescript from "rollup-plugin-typescript";
import autoPreprocess from "svelte-preprocess";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import dts from 'rollup-plugin-dts';

import tinycolor from "tinycolor2";

// const name = require('./package.json').main.replace(/\.js$/, '')

// const bundle = config => ({
//   ...config,
//   input: 'src/index.ts',
//   external: id => !/^[./]/.test(id),
// })

export default [
  {
    input: "src/component.ts",
    output: [
      {
        file: "dist/component.umd.js",
        format: "iife",
        name: "zorbcomponent",
      },
      {
        file: "dist/component.es.js",
        format: "esm",
        name: "zorbcomponent",
      },
    ],
    plugins: [
      resolve({ node: true }),
      svelte({
        preprocess: autoPreprocess(),
        compilerOptions: { customElement: true },
      }),
      commonjs({
        namedExports: {
          tinycolor2: Object.keys(tinycolor),
        },
      }),
      typescript({
        tsconfig: false,
        esModuleInterop: true,
      }),
    ],
  },
  {
    input: "src/main.ts",
    output: [
      {
        file: "dist/main.es.js",
        format: "esm",
        name: "zorb",
      }
    ],
    plugins: [
      resolve({ node: true }),
      commonjs({
        namedExports: {
          tinycolor2: Object.keys(tinycolor),
        },
      }),
      typescript(),
    ],
  },
  {
    input: "./src/main.ts",
    output: [{ file: "dist/main.d.ts", format: "es" }],
    plugins: [dts()],
  },
];
