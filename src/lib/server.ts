import * as Hapi from 'hapi'

const server = new Hapi.Server({
  port: 8181,
})

const init = async () => {
  await server.start()
}

const stop = async () => {
  await server.stop()
}

export { init, server, stop }
