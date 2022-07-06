const React = require('react')
module.exports =  function (props) {
  return  <ul>
    {props.data && props.data.map(item => {
      return <li>
        <span>{item.title}</span>
        <span>{item.price}</span>
      </li>
    })}
  </ul>

}
