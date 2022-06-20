import typescript from '@rollup/plugin-typescript';
import cjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json';

export default {
  input: 'src/client/index.tsx',
  output: {
    dir: 'public',
    format: 'es'
  },
  plugins: [typescript({
    tsconfig: "tsconfig.client.json",
  }), cjs(), nodeResolve({
    preferBuiltins: true,
  }), json()]
};