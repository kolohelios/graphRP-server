import { makeExecutableSchema } from 'apollo-server-hapi'
import { typeDefs as Part, resolvers as partResolvers } from './part'
import { merge as _merge } from 'lodash'

// otherwise uncategorized GQL schema would go here
const Query = `
  type Query {
    _empty: String
  }
`

// otherwise uncategorized resolvers would go here
const resolvers = {}

export default makeExecutableSchema({
  typeDefs: [Query, Part],
  resolvers: _merge(resolvers, partResolvers),
})
