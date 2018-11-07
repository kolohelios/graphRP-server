import index from '..'

describe('test entry point', () => {
  test('testing entry point', () => {
    const responseFromIndex = index()
    expect(responseFromIndex).toBe('hello')
  })
})
