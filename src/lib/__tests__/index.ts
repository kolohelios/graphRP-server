import * as Server from '../server'

describe('server entry point', () => {
  afterEach(async () => {
    // if we don't stop the server here, we'll get a Jest async operation error
    await Server.stop()
  })

  test('starting server', async () => {
    await Server.init()
    expect(Server.server).toBeDefined()
  })
})
