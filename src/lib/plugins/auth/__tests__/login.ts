import * as Server from '../../../server'

describe('login endpoint', () => {
  const options = {
    method: 'GET',
    url: '/beta/auth/login',
  }

  beforeAll(() => {
    return Server.init()
  })

  afterAll(() => {
    return Server.stop()
  })

  test('response with token', async () => {
    const response = await Server.server.inject(options)

    expect(response.statusCode).toBe(200)
    expect(typeof response.result).toBe('string')
  })
})
