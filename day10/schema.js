const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type Comment {
    id: Int
    title: String
    praiseNum: Int
  }
  type Query {
    comment: [Comment]
    name: String
  }

  type Mutation {
    praise(id: Int): Int
  }
`)

module.exports = schema