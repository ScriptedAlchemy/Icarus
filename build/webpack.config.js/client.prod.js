const merge = require('webpack-merge')
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const baseConfig = require('./client.base')
const env = require('../env')()
const config = require('../config')

const { publicPath, clientPath } = config[env.raw.NODE_ENV || 'production']

module.exports = merge.smart(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: path.join(clientPath, publicPath),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          output: {
            comments: false,
            ascii_only: true,
          },
          compress: {
            comparisons: false,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
})
