const { FuseBox, JSONPlugin } = require('fuse-box')
const { context, task } = require('fuse-box/sparky')

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
        proc.start()
    })
  }
})

task('default', async (context) => {
  const fuse = context.getConfig()
  context.createBundle(fuse)

  await fuse.run()
})
