import * as Server from '../../../server'

describe('valid endpoint', () => {
  beforeAll(() => {
    return Server.init()
  })

  afterAll(() => {
    return Server.stop()
  })

  test('response with unhappy status', async () => {
    const options = {
      method: 'GET',
      url: '/beta/auth/valid',
    }
    const response = await Server.server.inject(options)

    expect(response.statusCode).toBe(401)
  })

  test('response with happy status', async () => {
    const tokenRequestOptions = {
      method: 'GET',
      url: '/beta/auth/login',
    }

    const tokenResponse = await Server.server.inject(tokenRequestOptions)
    const token = tokenResponse.payload

    const validRequestOptions = {
      method: 'GET',
      url: '/beta/auth/valid',
      headers: {
        Authorization: token,
      }
    }

    const validResponse = await Server.server.inject(validRequestOptions)
      const options = {
        method: 'GET',
        url: '/beta/auth/valid',
      }

    expect(validResponse.statusCode).toBe(200)
  })
})
