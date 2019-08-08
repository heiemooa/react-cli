const path = require('path');
const AutoPreFixer = require('autoprefixer'); ////给 CSS3 的属性添加前缀，防止 CSS 样式冲突,结合 postcss-loader
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const paths = require('./paths');

const devWebpackConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', //有助于解释说明 js 原始出错的位置。（不要用于生产环境 https://webpack.docschina.org/configuration/devtool/）
  output: {
    filename: 'static/js/bundle.js', //指定了打包的名字和基本的引用路径static/js/bundle.js。
    chunkFilename: 'static/js/[name].chunk.js', //指定了非入口文件的名称static/js/[name].chunk.js。
  },
  devServer: {
    clientLogLevel: 'none', // 可能的值有 none, error, warning 或者 info（默认值)
    hot: true,  // 启用 webpack 的模块热替换特性, 这个需要配合： webpack.HotModuleReplacementPlugin插件
    contentBase: paths.appSrc, // 告诉服务器从哪里提供内容， 默认情况下，将使用当前工作目录作为提供内容的目录
    compress: true, // 一切服务都启用gzip 压缩
    host: '0.0.0.0', // 指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问 0.0.0.0
    port: 8080, // 端口
    // open: true, // 是否打开浏览器
    // overlay: {  // 出现错误或者警告的时候，是否覆盖页面线上错误消息。
    //   warnings: true,
    //   errors: true
    // },
    overlay: false,
    publicPath: '/', // 此路径下的打包文件可在浏览器中访问。
    proxy: {  // 设置代理
      '/api': {  // 访问api开头的请求，会跳转到  下面的target配置
        target: 'http://192.168.0.102:8080',
        pathRewrite: { '^/api': '/mockjsdata/5/api' }
      }
    },
    quiet: true, // necessary for FriendlyErrorsPlugin. 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
    watchOptions: { // 监视文件相关的控制选项
      poll: true,   // webpack 使用文件系统(file system)获取文件改动的通知。在某些情况下，不会正常工作。例如，当使用 Network File System (NFS) 时。Vagrant 也有很多问题。在这些情况下，请使用轮询. poll: true。当然 poll也可以设置成毫秒数，比如：  poll: 1000
      ignored: /node_modules/, // 忽略监控的文件夹，正则
      aggregateTimeout: 300 // 默认值，当第一个文件更改，会在重新构建前增加延迟
    }
  },
  module: {
    rules: [
      {
        test: /\.(c|sc|sa)ss/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true, //能看到样式具体在哪个文件哪一行
            }
          },
          {
            loader: 'postcss-loader', //给 CSS3 的属性添加前缀，防止 CSS 样式冲突
            options: {
              ident: 'postcss', //唯一标识符
              sourceMap: true,
              plugins: loader => [
                AutoPreFixer({ overrideBrowserslist: ['> 0.15% in CN'] }) // 添加前缀
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          }]
      },
    ]
  },
  plugins: [
    // new webpack.NamedModulesPlugin(), //当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
    new webpack.HotModuleReplacementPlugin()  // 启用模块热替换
  ]
};
module.exports = merge(common, devWebpackConfig);
