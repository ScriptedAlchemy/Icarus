const webpack = require('webpack')
const WriteFileWebpackPlugin = require('write-file-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./client.base')

const config = merge.smart(baseConfig, {
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
  ],
  plugins: [
    new WriteFileWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  performance: {
    hints: false,
  },
})

module.exports = config
