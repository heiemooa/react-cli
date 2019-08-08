'use strict'

const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.dev')
const webpack = require('webpack')
const compiler = webpack(config)
const paths = require('./paths')

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 8080
const HOST = process.env.HOST || '0.0.0.0'

const server = new WebpackDevServer(compiler, {
  clientLogLevel: 'none', // 可能的值有 none, error, warning 或者 info（默认值)
  contentBase: paths.appSrc, // 告诉服务器从哪里提供内容， 默认情况下，将使用当前工作目录作为提供内容的目录
  inline: true, // 自动刷新
  hot: true,  // 启用 webpack 的模块热替换特性, 这个需要配合： webpack.HotModuleReplacementPlugin插件
  historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
  port: DEFAULT_PORT, //如果省略，默认8080
  host: HOST, // 指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问 0.0.0.0
  publicPath: '/', //此路径下的打包文件可在浏览器中访问。
  quiet: false, // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
  overlay: false,
  watchOptions: { // 监视文件相关的控制选项
    poll: true,   // webpack 使用文件系统(file system)获取文件改动的通知。在某些情况下，不会正常工作。例如，当使用 Network File System (NFS) 时。Vagrant 也有很多问题。在这些情况下，请使用轮询. poll: true。当然 poll也可以设置成毫秒数，比如：  poll: 1000
    ignored: /node_modules/, // 忽略监控的文件夹，正则
    aggregateTimeout: 300 // 默认值，当第一个文件更改，会在重新构建前增加延迟
  },
  proxy: {  // 设置代理
    '/api': {  // 访问api开头的请求，会跳转到  下面的target配置
      target: 'http://192.168.0.102:8080',
      pathRewrite: { '^/api': '/mockjsdata/5/api' }
    }
  }
})
server.listen(DEFAULT_PORT, HOST, function (err) {
  if (err) throw err
  console.log('\x1b[36m%s\x1b[0m', 'Starting the development server...\n')
})
