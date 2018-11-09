export default {
  name: 'auth:valid',
  version: 'beta',
  register: async (server, options) => {
    server.route({
      method: 'GET',
      path: '/beta/auth/valid',
      handler: (req, res) => {
        return 'token is valid'
      }
    })
  }
}
