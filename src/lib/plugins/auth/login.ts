import * as jwt from 'jsonwebtoken'
import { secret } from '../../config'

// this endpoint is demilitarized intentionally
export default {
  name: 'auth:login',
  version: 'beta',
  register: async (server, options) => {
    server.route({
      method: 'GET',
      path: '/beta/auth/login',
      options: {
        auth: false
      },
      handler: () => {
        // HACK hard-coded ID for now (this doesn't actually log in a user)
        const token = jwt.sign({ id: 1 }, secret, { algorithm: 'HS256' })
        return token
      }
    })
  }
}
