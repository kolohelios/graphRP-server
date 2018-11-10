import * as Hapi from 'hapi'
import { ApolloServer } from 'apollo-server-hapi'
import schema from './schema'
import plugins from './plugins'

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
  const apolloServer = new ApolloServer({ schema })

  await server.register(require('hapi-auth-jwt2'))

  server.auth.strategy('jwt', 'jwt', {
    key: secret,
    validate,
  })

  // set the auth default before we add additional plugins
  server.auth.default('jwt')

  server.register(plugins)

  await apolloServer.applyMiddleware({ app: server, })

  await apolloServer.installSubscriptionHandlers(server.listener)

  await server.start()
}

const stop = async () => {
  await server.stop({ timeout: 60 * 1000 })
}

export { init, server, stop }
