const path = require('path')
const merge = require('webpack-merge')
const { client: clientLoaders } = require('./loaders')
const plugins = require('./plugins')
const common = require('./common.base')

module.exports = merge.smart(common, {
  name: 'client',
  target: 'web',
  entry: [path.resolve(__dirname, '../../src/index.js')],
  module: {
    rules: clientLoaders,
  },
  plugins: plugins.client,
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
})
