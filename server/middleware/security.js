const helmet = require('helmet')
const csrf = require('csurf')
const hpp = require('hpp')

module.exports = (express, app, done) => {
  // https://helmetjs.github.io
  app.use(helmet())

  // https://www.npmjs.com/package/hpp
  app.use(hpp())
  app.use(csrf({ cookie: true }))
}
