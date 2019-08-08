const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
  },
  resolve: {
    extensions: ['.web.js', '.vue', '.mjs', '.js', '.json', '.web.jsx', '.jsx'], //引入的时候，可以忽略文件后缀名
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  externals: { //从输出的 bundle 中排除依赖，
    jquery: 'jQuery', //例如，从 CDN 引入 jQuery，而不是把它打包：
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader', // 根据图片大小，把图片优化成base64
            options: {
              limit: 8192, //限制如果小于8k，图片转为base64,
              name: 'static/img/[name].[hash:8].[ext]',
            }
          }, {
            loader: 'image-webpack-loader', // 先进行图片优化
            options: {
              mozjpeg: { //压缩JPEG图像
                progressive: true,
                quality: 65
              },
              optipng: { //压缩PNG图像
                enabled: false
              },
              pngquant: { //压缩PNG图像
                quality: '65-90',
                speed: 4
              },
              gifsicle: { //压缩GIF图像
                interlaced: false
              },
              webp: { //将JPG和PNG图像压缩为WEBP
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/, //自定义字体的压缩
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'), //加快编译速度,只编译src目录
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true, //指定的目录将用来缓存 loader 的执行结果,之后的 webpack 构建，将会尝试读取缓存，来避免在每次执行时，可能产生的、高性能消耗的 Babel 重新编译过程(recompilation process)
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              // eslint options (if necessary)
              // fix: true
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'AICODER 全栈线下实习', // 默认值：Webpack App
      // filename: 'index.html', // 默认值： 'index.html'
      template: path.resolve(__dirname, './src/index.html'),
      minify: {
        collapseWhitespace: true, //清理html中的空格、换行符。（默认值false）
        removeComments: true, //清理html中的注释（默认值false）
        removeAttributeQuotes: true, // 移除属性的引号,
        removeEmptyAttributes: false, //清理内容为空的元素。(默认值false,这个功能慎用，空元素可能用于占位或在js逻辑里有填充动作)
        removeStyleLinkTypeAttributes: true, //构建后style和link标签的type属性被清理(默认值false）
        minifyJS: true, //压缩html内的js（默认值false）
        minifyCSS: true, //压缩html内的样式（默认值false）
        minifyURLs: true,
      }
    }),
  ],
};
