import * as Server from '../server'

describe('server entry point', () => {
  beforeAll(() => {
    return Server.init()
  })

  afterAll(() => {
    return Server.stop()
  })

  test('started server', async () => {
    expect(Server.server).toBeDefined()
  })
})
