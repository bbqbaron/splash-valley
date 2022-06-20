import typescript from '@rollup/plugin-typescript';
import cjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json';

export default {
  input: 'src/server/index.ts',
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  plugins: [typescript(), cjs(), nodeResolve({
    preferBuiltins: true,
  }), json()]
};