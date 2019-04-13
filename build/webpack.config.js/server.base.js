const path = require('path')
const merge = require('webpack-merge')
const fs = require('fs')
const common = require('./common.base')
const { server: serverLoaders } = require('./loaders')
const plugins = require('./plugins')
const config = require('../config')

const { serverPath } = config[process.env.NODE_ENV || 'development']

const devServerExternals = fs
  .readdirSync(path.resolve(__dirname, '../../node_modules'))
  .filter(x => !/\.bin|react-universal-component|webpack-flush-chunks/.test(x))
  .reduce((externals, mod) => {
    externals[mod] = `commonjs ${mod}`
    return externals
  }, {})

devServerExternals['react-dom/server'] = 'commonjs react-dom/server'

module.exports = merge.smart(common, {
  name: 'server',
  target: 'node',
  entry: ['@babel/polyfill', path.resolve(__dirname, '../../server/render.js')],
  output: {
    path: serverPath,
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: serverLoaders,
  },
  externals: process.env.NODE_ENV === 'development' ? devServerExternals : [],
  optimization: {
    minimize: false,
  },
  plugins: plugins.server,
  stats: {
    colors: true,
  },
})
