const createTemplate = require('./demo')

const tempA = createTemplate(`${__dirname}/a.js`)
console.log(tempA({ name: '123'}))