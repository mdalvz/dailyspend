import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';

export default {
  input: 'src/index.tsx',
  output: {
    file: 'build/index.js',
    format: 'iife',
    inlineDynamicImports: true,
  },
  cache: true,
  plugins: [
    typescript(),
    commonjs(),
    nodeResolve({ browser: true }),
    json(),
    terser(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
};
