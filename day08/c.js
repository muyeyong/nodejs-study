const createTemplate = require('./demo')

const tempA = createTemplate(`${__dirname}/a.html`)
console.log(tempA({ name: '123'}))