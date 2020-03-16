import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import App from './components/App'
import configureStore from './configureStore'

// const context = require.context('./components', true);

// console.log(context.resolve('./Home.js').keys)
// const getModuleByName = module => {
//   const moduleFunction = __webpack_modules__[module]
//   console.log(moduleFunction)
//   let moduleID
//   // moduleFunction({}, null, id => {
//   //   moduleID = id
//   // })
//   return moduleID
// }
//
// console.log(getModuleByName(require.resolveWeak('./components/Home.js')))
const { store } = configureStore(window.REDUX_STATE)
// To change basename, put there the second param:
// const { store } = configureStore(window.REDUX_STATE, { basename: '/somewhere' })

const render = App => {
  const root = document.getElementById('root')

  ReactDOM.hydrate(
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>,
    root,
  )
}

render(App)

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('./components/App', () => {
    // eslint-disable-next-line
    const App = require('./components/App').default

    render(App)
  })
}
