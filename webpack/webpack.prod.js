const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //把 css 抽取到单独的一个 css 文件中.webpack4 开始使用： mini-css-extract-plugin插件, 1-3 的版本可以用： extract-text-webpack-plugin
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') //压缩 css 插件
const AutoPreFixer = require('autoprefixer') ////给 CSS3 的属性添加前缀，防止 CSS 样式冲突,结合 postcss-loader
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') //js压缩
const { CleanWebpackPlugin } = require('clean-webpack-plugin') //清空文件夹
const merge = require('webpack-merge')
const common = require('./webpack.common')
const paths = require('./paths')

const cssFilename = 'static/css/[name].[contenthash:8].css'
const extractTextPluginOptions = { publicPath: Array(cssFilename.split('/').length).join('../') }

const prodWebpackConfig = {
  mode: 'production',
  entry: {
    main: paths.appIndexJs,
    vendor1: ['react', 'react-dom']
  },
  output: {
    filename: 'static/js/[name].[chunkhash:8].js',
    path: paths.appBuild
  },
  module: {
    rules: [
      {
        test: /\.(c|sc|sa)ss/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: extractTextPluginOptions
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true, //能看到样式具体在哪个文件哪一行
            },
          },
          {
            loader: 'postcss-loader', //给 CSS3 的属性添加前缀，防止 CSS 样式冲突，结合 autoprofixer
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
              sourceMap: true
            }
          }]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: cssFilename, // 设置最终输出的文件名
      chunkFilename: 'static/css/[id].[contenthash:8].css'
    }),
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}), //压缩css
      new UglifyJsPlugin({
        cache: true, parallel: true, sourceMap: true // set to true if you want JS source maps
      }),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor1",
          chunks: "all"
        }
      }
    }
  }
}

module.exports = merge(common, prodWebpackConfig)
