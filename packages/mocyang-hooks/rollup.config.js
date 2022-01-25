/**
 * @type {import('rollup').RollupOptions}
 */
import typescript from '@rollup/plugin-typescript';
export default {
  input: 'src/hooks/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'es'
  },
  plugins: [typescript()]
}
