import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

const getRollupPluginsConfig = () => {
  return [
    typescript(),
    terser({
      ecma: 5,
      module: true,
      toplevel: true,
      compress: { pure_getters: true },
      format: { wrap_func_args: false },
    }),
  ];
};
export default defineConfig([
  {
    // UMD 输出配置
    input: 'src/index.ts',
    output: {
      format: 'umd',
      name: 'NearestColor',
      file: 'dist/index.umd.js',
      inlineDynamicImports: true,
      globals: {
        tinycolor2: 'tinycolor',
      },
    },
    plugins: [
      resolve(),
      commonjs({
        include: /node_modules/,
      }),
      typescript(),
      terser(),
    ],
  },
  {
    // CommonJS (CJS) 输出配置
    input: 'src/index.ts',
    output: {
      format: 'cjs',
      file: 'dist/index.cjs',
    },
    external: ['tinycolor2'],
    plugins: getRollupPluginsConfig(),
  },
  {
    // ES Module (ESM) 输出配置
    input: 'src/index.ts',
    output: {
      format: 'es',
      file: 'dist/index.mjs',
    },
    external: ['tinycolor2'],
    plugins: getRollupPluginsConfig(),
  },
  {
    // Declaration 文件输出配置
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.d.ts',
        format: 'es',
      },
      {
        file: 'dist/index.d.cts',
        format: 'cjs',
      }
    ],
    plugins: [dts()],
  },
]);
