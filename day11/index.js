require("@babel/register")({
  presets: ['@babel/preset-react']
})

const renderReact = require('./renderReact')
const react = require('react')


const ReactDomServe = require('react-dom/server')
const App = require('./index.jsx')
// // function App() {
// //   rerurn(
// //     <div>
// //       <p>server render</p>
// //     </div>)
// // }

console.log(ReactDomServe.renderToString(react.createElement(App)))

// renderReact(<App />)