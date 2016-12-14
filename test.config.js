import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';

export default {
  entry: 'tests/index.js',
  moduleName: 'heimdalljs-tree',
  format: 'cjs',
  external: [
    'fs', 'heimdalljs', 'regenerator-runtime', 'chai'
  ],
  plugins: [
    babel({ exclude: 'node_modules/**' }),
    nodeResolve({ jsnext: true, main: true }),
    commonjs({ include: 'node_modules/**' }),
    json(),
  ],
  dest: 'dist/tests/index.js',
};
