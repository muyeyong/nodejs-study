const React = require('react')
module.exports =  function (props) {
  return  <>
  <div>
    <select name="sort" id="sort-id">
      <option value=""> ---请选择排序字段---</option>
      <option value='id'>ID排序</option>
      <option value='title'>名称排序</option>
      <option value='price'>价格排序</option>
    </select>
  </div>
  <div>
    <select name="order" id="order-id">
      <option value=""> ---请选择升序或降序--- </option>
      <option value='1'>升序</option>
      <option value='-1'>降序</option>
    </select>
  </div>
  <ul>
    {props.data && props.data.map(item => {
      return <li key={item.id}>
        <span>{item.title}</span>
        <span>{item.price}</span>
      </li>
    })}
  </ul>
  </>

}
