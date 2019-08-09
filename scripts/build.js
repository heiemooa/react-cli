//用到compiler钩子，可以监听文件系统打包回调，比如在编译失败/成功之后打印指定信息的时候，可以用到
const webpack = require('webpack')
const webpackConfig = require('./webpack.prod')

function build () {
  let compiler = webpack(webpackConfig)
  return new Promise((resolve, reject) => {
    compiler.run(function (err, stats) {
      if (err) reject(err)
      let statsJson = stats.toJson({}, true)
      if (statsJson.errors.length) {
        return reject(new Error(statsJson.errors.join('\n\n')))
      }
      if (statsJson.warnings.length) {
        return reject(new Error(statsJson.errors.join('\n\n')))
      }
      return resolve({
        version: `webpack ${statsJson.version}`,
        hash: statsJson.hash,
        duration: `${statsJson.time}ms`, //编译时长
        time: statsJson.builtAt, //开始编译时间
        warnings: statsJson.warnings,
      })
    })
  })

}

build().then(success => {
  console.log('\x1b[32m%s\x1b[0m', 'Compiled successfully.\n')
  console.log(success)

}, fail => {
  console.log('\x1b[31m%s\x1b[0m', 'Failed to compile.');
  console.log(fail)
})


