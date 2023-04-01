export default [
  {
    input: 'src/index.js',
    output: {
      name: 'markedMangle',
      file: 'lib/index.umd.js',
      format: 'umd',
      globals: {
        marked: 'marked'
      }
    },
    external: ['marked']
  },
  {
    input: 'src/index.js',
    output: {
      file: 'lib/index.cjs',
      format: 'cjs'
    },
    external: ['marked']
  }
];
