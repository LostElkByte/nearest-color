import { defineConfig } from 'rollup';
import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';

export default defineConfig(
  {
    input: 'src/index.ts',
    output: [
      {
        format: 'umd',
        name: 'closestColorLibrary',
        file: 'dist/index.js',
        globals: {
          tinycolor2: 'tinycolor',
        },
      },
      {
        format: 'cjs',
        file: 'dist/index.cjs.js',
      },
      {
        format: 'es',
        file: 'dist/index.esm.js',
      },
    ],
    plugins: [typescript()],
    external: ['tinycolor2'],
  },
  {
    //打包声明文件
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
);
