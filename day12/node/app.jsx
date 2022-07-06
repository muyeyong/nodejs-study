const React = require('react')
const List = require('./List')

module.exports = function (data) {
    return <>
      <List data={data.list}/>
    </>
}