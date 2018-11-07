import { gql } from 'apollo-server-hapi'

export default gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`
