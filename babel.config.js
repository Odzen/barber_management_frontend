module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { esmodules: true } }],
    ['@babel/preset-react', { runtime: 'automatic', targets: { node: 'current' } }]
  ],
  plugins: ['@babel/plugin-syntax-import-meta']
}
