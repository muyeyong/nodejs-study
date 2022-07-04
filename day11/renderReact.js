require("@babel/register")({
  presets: ['@babel/preset-react']
})

const reactDomServe = require('react-dom/server')
module.exports = function(app) {
  return reactDomServe.renderToString(app)
}