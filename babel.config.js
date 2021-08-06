module.exports = {
  presets: [
    '@gem-mine/app'
  ],
  plugins: [
    ['import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true
    }]
  ]
}
