import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { Helmet } from 'react-helmet'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import configureStore from './configureStore'
import App from '../src/components/App'

export default ({ clientStats }) => async (req, res, next) => {
  try {
    const store = await configureStore(req, res)
    if (!store) return // no store means redirect was already served

    const app = createApp(App, store)
    const appString = renderToString(app)
    const helmet = Helmet.renderStatic()
    const stateJson = JSON.stringify(store.getState())
    const chunkNames = flushChunkNames()
    const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames })
    // res.render('send', { csrfToken: req.csrfToken() })
    console.info(chunkNames)
    return res.send(`<!doctype html>
     <html ${helmet.htmlAttributes.toString()}>
        <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
          ${styles}
        </head>
        <body ${helmet.bodyAttributes.toString()}>
          <script>window.REDUX_STATE = ${stateJson}</script>
          <div id="root">${appString}</div>
          ${js}
        </body>
      </html>`)
  }
  catch (err) {
    console.error(err)
  }
}

const createApp = (App, store) => (
  <Provider store={store}>
    <App />
  </Provider>
)
