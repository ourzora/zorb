import svelte from "rollup-plugin-svelte";
import typescript from "rollup-plugin-typescript";
import autoPreprocess from "svelte-preprocess";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import dts from "rollup-plugin-dts";

import tinycolor from "tinycolor2";

const commonPlugins = [
  resolve({ node: true }),
  commonjs({
    namedExports: {
      tinycolor2: Object.keys(tinycolor),
    },
  }),
  typescript({
    tsconfig: false,
    esModuleInterop: true,
  }),
];

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
      svelte({
        preprocess: autoPreprocess(),
        compilerOptions: { customElement: true },
      }),
      ...commonPlugins,
    ],
  },
  {
    input: "src/main.ts",
    output: [
      {
        file: "dist/main.js",
        format: "esm",
        name: "zorb",
      },
    ],
    plugins: [...commonPlugins],
  },
  {
    input: "./src/main.ts",
    output: [{ file: "dist/main.d.ts", format: "es" }],
    plugins: [dts()],
  },
];
