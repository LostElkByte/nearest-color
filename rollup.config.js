import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

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
      commonjs({
        include: /node_modules/,
      }),
      typescript(),
      resolve(),
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
    plugins: [
      typescript(),
      terser(),
    ],
  },
  {
    // ES Module (ESM) 输出配置
    input: 'src/index.ts',
    output: {
      format: 'es',
      file: 'dist/index.mjs',
    },
    external: ['tinycolor2'],
    plugins: [
      typescript(),
      terser(),
    ],
  },
  {
    // Declaration 文件输出配置
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.d.mts',
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
