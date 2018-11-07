import resolvers from '..'

describe('resolvers', () => {
  test('hello resolver', async () => {
    const response = await resolvers.Query.hello()
    expect(response).toBe('1.5 seconds later...')
  })
})
