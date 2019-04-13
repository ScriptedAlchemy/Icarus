const ExtractCSSChunks = require('mini-css-extract-plugin')
const path = require('path')

const babelLoader = {
  test: /\.(js|jsx|mjs)$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        cacheDirectory: false,
      },
    },
  ],
}

const baseStyleLoader = initialLoaders => ({
  test: /\.(scss|css)$/,
  exclude: /node_modules/,
  use: [
    ...initialLoaders,
    // {
    //   loader: 'postcss-loader',
    //   options: {
    //     config: {
    //       path: path.join(__dirname, 'postcss.config.js'),
    //     },
    //   },
    // },
    {
      loader: 'sass-loader',
      options: {
        importLoaders: 2,
        sourceMap: true,
      },
    },
    // {
    //   loader: 'sass-resources-loader',
    //   options: {
    //     resources: [
    //       path.join(__dirname, '../../src/assets/css/variables.scss'),
    //       path.join(__dirname, '../../src/assets/css/utils/mixins.scss'),
    //       path.join(__dirname, '../../src/assets/css/utils/extends.scss'),
    //     ],
    //   },
    // },
  ],
})

const cssLoaderClient = baseStyleLoader([
  {
    loader: ExtractCSSChunks.loader,
    options: {
      hmr: true,
      reloadAll: true,
    },
  },
  {
    loader: 'css-loader',
    options: {
      sourceMap: true,
      camelCase: true,
      modules: true,
      importLoaders: 2,
      localIdentName: '[name]__[local]--[hash:base64:5]',
    },
  },
])

const cssLoaderServer = baseStyleLoader([
  {
    loader: 'css-loader/locals',
    options: {
      camelCase: true,
      importLoaders: 2,
      modules: true,
      localIdentName: '[name]__[local]--[hash:base64:5]',
    },
  },
])

const urlLoaderClient = {
  test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
  loader: 'url-loader',
  options: {
    limit: 10000,
    name: '[name].[hash:8].[ext]',
  },
}

const urlLoaderServer = {
  ...urlLoaderClient,
  options: {
    ...urlLoaderClient.options,
    emitFile: false,
  },
}

const fileLoaderClient = {
  test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[hash:7].[ext]',
        publicPath: '/static/',
      },
    },
  ],
}

const fileLoaderServer = {
  test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[hash:7].[ext]',
        publicPath: '/static/',
        emitFile: false,
      },
    },
  ],
}

// Write css files from node_modules to its own vendor.css file
const externalCssLoaderClient = {
  test: /\.css$/,
  include: /node_modules/,
  use: [ExtractCSSChunks.loader, 'css-loader'],
}

// Server build needs a loader to handle external .css files
const externalCssLoaderServer = {
  test: /\.css$/,
  include: /node_modules/,
  loader: 'css-loader/locals',
}

// Native ES6 Modules need to be interpreted correctly within webpack
// https://github.com/apollographql/react-apollo/issues/1737#issuecomment-372946515
const mjsLoader = {
  test: /\.mjs$/,
  include: /node_modules/,
  type: 'javascript/auto',
}

const client = [
  {
    oneOf: [
      mjsLoader,
      babelLoader,
      cssLoaderClient,
      urlLoaderClient,
      fileLoaderClient,
      externalCssLoaderClient,
    ],
  },
]
const server = [
  {
    oneOf: [
      mjsLoader,
      babelLoader,
      cssLoaderServer,
      urlLoaderServer,
      fileLoaderServer,
      externalCssLoaderServer,
    ],
  },
]

module.exports = {
  client,
  server,
}
