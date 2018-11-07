export default {
  Query: {
    hello: () => {
      return new Promise((fulfilled) => {
        setTimeout(() => {
          fulfilled('1.5 seconds later...')
        }, 1500)
      })
    },
  }
}
