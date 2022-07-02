import typescript from '@rollup/plugin-typescript';
import cjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';

export default {
  input: 'src/client/index.tsx',
  output: {
    dir: 'public',
    format: 'es'
  },
  plugins: [typescript({
    tsconfig: "tsconfig.client.json",
  }),
  cjs(),
  nodeResolve({
    browser: true,
    preferBuiltins: true
  }),
  json(),
  replace({
    // JS is such a trashfire
    'process.env.NODE_ENV': '"production"'
  }),
  ]
};