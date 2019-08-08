const AutoPreFixer = require('autoprefixer') //给 CSS3 的属性添加前缀，防止 CSS 样式冲突,结合 postcss-loader
const webpack = require('webpack')
const merge = require('webpack-merge')
const paths = require('./paths')
const common = require('./webpack.common')

const devWebpackConfig = {
  mode: 'development',
  entry: {
    main: paths.appIndexJs,
  },
  devtool: 'cheap-module-eval-source-map', //有助于解释说明 js 原始出错的位置。（不要用于生产环境 https://webpack.docschina.org/configuration/devtool/）
  output: {
    filename: 'static/js/bundle.js', //指定了打包的名字和基本的引用路径static/js/bundle.js。
    chunkFilename: 'static/js/[name].chunk.js', //指定了非入口文件的名称static/js/[name].chunk.js。
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
    new webpack.NamedModulesPlugin(), //当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
    new webpack.HotModuleReplacementPlugin()  // 启用模块热替换
  ]
}
module.exports = merge(common, devWebpackConfig)
