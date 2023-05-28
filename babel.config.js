module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { esmodules: true } }],
    ['@babel/preset-react', { runtime: 'automatic', targets: { node: 'current' } }]
  ],
  plugins: ['@babel/transform-runtime', '@babel/plugin-syntax-jsx', 'babel-plugin-transform-import-meta']
}
