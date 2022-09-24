require("@babel/register")({
  presets: ['@babel/preset-react']
}) // 这里不需要也可以？ 不可以

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

console.log(App)
console.log(ReactDomServe.renderToString(react.createElement(App)))

// renderReact(<App />)