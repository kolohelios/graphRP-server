import * as Server from './lib/server'

try {
  Server.init()
} catch (error) {
  console.error(error)
}
