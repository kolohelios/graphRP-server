import * as Hapi from 'hapi'
import { ApolloServer } from 'apollo-server-hapi'
import typeDefs from './schema'
import resolvers from './resolvers'
import * as jwt from 'jsonwebtoken'

const secret = 'ThisSecretIsNoSuchThing'

const server = new Hapi.Server({
  port: 8181,
})

const people = {
  1: {
    id: 1,
    name: 'John Doe'
  },
}

const validate = async (decoded, request) => {
  if (!people[decoded.id]) {
    return { isValid: false }
  } else {
    return { isValid: true }
  }
}

const init = async () => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  })

  server.route({
    method: 'GET',
    path: '/login',
    options: {
      auth: false
    },
    handler: () => {
      const token = jwt.sign({ id: 1 }, secret, { algorithm: 'HS256' })
      return token
    }
  })

  server.route({
    method: 'GET',
    path: '/hello',
    handler: (req, res) => {
      return 'yes, token received!'
    }
  })

  await server.register(require('hapi-auth-jwt2'))

  server.auth.strategy('jwt', 'jwt', {
    key: secret,
    validate,
  })

  server.auth.default('jwt')

  await apolloServer.applyMiddleware({ app: server, })

  await apolloServer.installSubscriptionHandlers(server.listener)

  await server.start()
}

const stop = async () => {
  await server.stop()
}

export { init, server, stop }
