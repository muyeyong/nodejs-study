const React = require('react')
const ReactDOM = require('react-dom')

const initData = window.reactInitData || []

const App = function() {
  const [data, setData] = React.useState(initData)
  const [order, setOrder] = React.useState(1)
  const [sort, setSort] = React.useState('id')
  const sortChange = (e) => {
    const newSort  = e.target.value
    fetch(`/api?sort=${newSort}&order=${order}`).then(res => res.json()).then(json => {
      setData(json.list)
    })
  }
  const orderChange = (e) => {
    console.log('orderChange', e.target.value)
  }
  return  <>
  <div>
    <select name="sort" id="sort-id" onChange={sortChange}>
      <option value=""> ---请选择排序字段---</option>
      <option value='id'>ID排序</option>
      <option value='title'>名称排序</option>
      <option value='price'>价格排序</option>
    </select>
  </div>
  <div>
    <select name="order" id="order-id" onChange={orderChange}>
      <option value=""> ---请选择升序或降序--- </option>
      <option value='1'>升序</option>
      <option value='-1'>降序</option>
    </select>
  </div>
  <ul>
    {data.map(item => {
      return <li key={item.id}>
        <span>{item.title}</span>
        <span>{item.price}</span>
      </li>
    })}
  </ul>
  </>
}

ReactDOM.render(<App />, document.getElementById('reactapp'))