const { graphql, buildSchema} = require('graphql')

const schema = buildSchema(`
  type StudyList {
    name: String
  }
  type Query {
    studyList: [StudyList]
  }
`)

const rootValue = {
  studyList: () => [{ name: '学习nodejs'}, { name: '学习React'}]
}
const source = '{studyList{name}}'

graphql({ schema, source, rootValue }).then(res => {
  console.log(res.data)
})

// var { graphql, buildSchema } = require('graphql');

// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// var rootValue = { hello: () => 'Hello world!' };

// var source = '{ hello }';

// graphql({ schema, source, rootValue }).then((response) => {
//   console.log(response);
// });
