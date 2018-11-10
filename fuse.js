const { FuseBox, JSONPlugin } = require('fuse-box')
const { context, task } = require('fuse-box/sparky')
const { spawn } = require('child_process')

// start up the PM2 instance (we don't need to stop it; stopping Fuse-Box suffices)
spawn('./node_modules/pm2/bin/pm2', ['start', './build/server/bundle.js'])

context(class {
  getConfig() {
    return FuseBox.init({
      tsConfig: './tsconfig.json',
      homeDir: 'src',
      output: 'build/$name.js',
      target: 'server@es7',
      plugins: [
        [ 'node_modules/**.json', JSONPlugin() ],
      ],
    })
  }

  createBundle(fuse) {
    const app = fuse.bundle('server/bundle')
    const vendor = fuse.bundle('server/vendor')

    app.instructions('> [index.ts]')
    vendor.instructions('~ index.ts')

    app.watch('src/**')
    app.completed((proc) => {
      console.info('Restarting PM2 instance...')
      spawn('./node_modules/pm2/bin/pm2', ['restart', './build/server/bundle.js'])
    })
  }
})

task('default', async (context) => {
  const fuse = context.getConfig()
  context.createBundle(fuse)

  await fuse.run()
})
