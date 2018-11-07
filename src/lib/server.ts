import * as Hapi from 'hapi'
import { ApolloServer } from 'apollo-server-hapi'
import typeDefs from './schema'
import resolvers from './resolvers'

const server = new Hapi.Server({
  port: 8181,
})

const init = async () => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  })

  await apolloServer.applyMiddleware({ app: server, })

  await apolloServer.installSubscriptionHandlers(server.listener)

  await server.start()
}

const stop = async () => {
  await server.stop()
}

export { init, server, stop }
