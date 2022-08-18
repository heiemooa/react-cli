# 优化

## 一、图片压缩

- image-webpack-loader 压缩优化
  - 安装 `npm install image-webpack-loader --save-dev`
  - 修改 webpack.common.js 文件
  ```
  // webpack.common.js
  {
     test: /\.(png|svg|jpe?g|gif)$/,
     use: [
       'file-loader',
  +       {
  +         loader: 'image-webpack-loader',
  +         options: {
  +           mozjpeg: {
  +             progressive: true,
  +             quality: 65
  +           },
  +           optipng: {
  +             enabled: false,
  +           },
  +           pngquant: {
  +             quality: '65-90',
  +             speed: 4
  +           },
  +           gifsicle: {
  +             interlaced: false,
  +           },
  +           webp: {
  +             quality: 75
  +           }
  +         }
  +       },
        ]
      }
  ```
- 进一步处理图片打包成 Base64

  - 安装 `npm install --save-dev url-loader`
  - 修改 webpack.common.js 文件

  ```
    // webpack.common.js
    {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
  -       'file-loader',
  +        {
  +          loader: 'url-loader', // 根据图片大小，把图片优化成base64
  +          options: {
  +            limit: 8192, //限制如果小于8k，图片转为base64,
  +            name: 'static/img/[name].[hash:8].[ext]',
  +          }
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
  ```

### 二、css 前缀兼容

PostCSS 是一个 CSS 的预处理工具给 CSS3 的属性添加前缀，兼容浏览器

- 安装 `npm i postcss-loader autoprefixer --save-dev`
- 修改 webpack.dev.js 文件
  ```
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
  +        {
  +          loader: 'postcss-loader', //给 CSS3 的属性添加前缀，防止 CSS 样式冲突
  +          options: {
  +            ident: 'postcss', //唯一标识符
  +            sourceMap: true,
  +            plugins: loader => [
  +              AutoPreFixer({ overrideBrowserslist: ['> 0.15% in CN'] }) // 添加前缀
  +            ]
  +          }
  +        },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          }]
      },
  ```

### 三、热更新/局部热更新

- react-hot-loader 热加载

  - 安装 `npm install webpack-dev-server --save-dev`
  - 修改 webpack.dev.js 文件, 如果 server proxy 单独创建一个文件，如 dev.server.js 文件，那么需要改动这个文件，webpack.dev.js 中就不需要定义 devServer

  ```
  // webpack.dev.js
    devServer: {
   +  contentBase: './build'
    },

    plugins: [
  +   new webpack.NamedModulesPlugin(), //当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
  +   new webpack.HotModuleReplacementPlugin()  // 启用模块热替换
    ]
  ```

- react-hot-loader v4 局部热加载
  - 安装 `npm install react-hot-loader --save-dev`, `npm install @hot-loader/react-dom --save`
  - 修改文件
  ```
    // webpack.common.js
    resolve: {
       alias: {
  +      'react-dom': '@hot-loader/react-dom'
       }
    }
  ```
  ```
    // webpack.dev.js
    devServer: {
  +    hot: true,
       contentBase: './build'
    }
  ```
  ```
    // App.js
    import React from 'react';
    import { hot } from 'react-hot-loader';

    const App = () => <div>Hello world!</div>;

    export default hot(module)(App);
  ```
  ```
    // index.js
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './containers/App';

    ReactDOM.render(<App />, document.getElementById('root'));
  ```
  - 注意：
    1.  版本 >4.0, webpack.dev.js 可以不设置 `entry：【"react-hot-loader/patch"]`; .babelrc 中也可移除 `"plugins": ["react-hot-loader/babel"]`
    2.  新版本需要用@hot-loader/react-dom 替换 react-dom，在生产环境能正常编译，不过还不知道是否有影响

### 四、分块打包

### 五、proxy 映射

- 定义了 dev.server.js 文件，本地运行 npm start 将运行此文件
  - package.json 中定义 proxy
  - src/common/config.js 中配置，如果 package.json 中定义了，则以 package.json 中为准

### 六、eslint 语法检测

- 安装依赖 `npm install eslint babel-eslint eslint-loader eslint-plugin-react --save-dev`
- 文件
  - 新建配置文件 .eslintrc
  - 新建忽略文件 .eslintignore
  - 修改 webpack.common.js, //这里添加，在打包编译的时候会进行校验
  ```
  {
          test: /\.(js|jsx)$/,
          include: paths.appSrc, //加快编译速度,只编译src目录
          use: [
            {
              loader: 'eslint-loader',
              options: {
                // eslint options (if necessary)
                // fix: true
              }
            }
          ]
        }
  ```

### 七、webpack compiler 钩子

- 添加 npm run build 指令
  - 定义了 scripts/build.js 文件，依赖 compiler 钩子回调可以获取 webpack 编译打包成功与否
  - 功能待完善，需要添加编译进度，编译完成之后的文件展示等
