const webpack = require('webpack')
const ExtractCSSChunks = require('mini-css-extract-plugin')
const env = require('../env')()

const shared = []
// Due to instability with webpack 4.20 and up, HardSourceWebpackPlugin will remain disabled
// env.raw.NODE_ENV === 'development' && shared.push(new HardSourceWebpackPlugin())

const client = [
  new webpack.DefinePlugin(env.stringified),
  new webpack.DefinePlugin({
    API_URL: JSON.stringify(require('../config')[env.raw.NODE_ENV].apiUrl),
  }),
  new ExtractCSSChunks({
    hot: env.raw.NODE_ENV === 'development',
    modules: true,
  }),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
]

const server = [
  new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1,
  }),
  new ExtractCSSChunks({
    hot: env.raw.NODE_ENV === 'development',
    modules: true,
  }),
  new webpack.DefinePlugin({
    API_URL: JSON.stringify(require('../config')[env.raw.NODE_ENV].apiUrl),
  }),
]

module.exports = {
  shared,
  client,
  server,
}
