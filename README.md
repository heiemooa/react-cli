# 关于
搭建这套框架的初心是为了不依赖于任何第三方脚手架，从 0-1 搭建一套最新依赖的 react 前端基础脚手架，用于快速的实现项目需求的开发；

## 一、技术栈
webpack4、babel7、es6、react16.8、react-router-dom、less、axios、socket.io、eslint

## 二、项目运行

#### 环境
以下是我搭建项目所用环境（仅作参考）
```
  1、node: v10.15.2
  2、npm: 6.4.2
  3、电脑: mac 10.13.3 系统
```

#### 运行
```
  git clone https://github.com/huangfushan/react-cli.git
   
  cd react-cli
   
  npm install 或 yarn
   
  npm start 或 npm run start

  访问: http://localhost:8080
```
如果 npm install 速度太慢，可以使用淘宝源安装，然后再执行 cnpm install
```
  npm install -g cnpm --registry=https://registry.npm.taobao.org 
  cnpm install
```

#### socket.io 通讯
如果想体验`实时群聊通讯功能`，需要开启 socket 服务，执行以下命令，端口地址：localhost:8081
```
  npm run socket

```

#### 打包部署
 ```
   npm run prod （生成 build 文件，部署 build 文件到服务器即可）
 
 ```
 
#### 注意：
* 服务端返回的数据统一格式，详情见接口文档： <a target="_blank" href="https://github.com/huangfushan/react-cli/blob/master/API.md">API.md</a>
```
 {
   status: 0,
   msg: '开发人员调试可见的消息提示',
   notice: '用户可见的消息提示',
   data: {
     total: 100,
     'list': [],
   },
 }
 ```
* ajax 请求封装详情见 <a target="_blank" href="https://github.com/huangfushan/react-cli/blob/master/src/utils/http.js">src/util/http.js</a>，后端接口正常 status 返回值是 0；其他即访问出错，比如 401 表示登录失效。
* 如果无法提供真实接口数据，想登录进去查看主页，可以手动修改 src/api/authApi.js 中的 signIn 方法，通过 promise 直接返回需要的数据皆可。
```
  // signIn: params => http.post(`/auth`, params), // 登录
  
  signIn: () => Promise.resolve({
    status:0,
    notice:"",
    msg:'',
    data: {
      session: 'session',
      username: '用户昵称'
    }
  }), // 登录
```
* 如果有问题或建议欢迎提 issue，感谢参与。

## 三、功能目标
- [√] 路由分配
- [√] 登录/登出
- [√] redux 数据流管理
- [√] proxy 接口映射
- [√] webpack 优化打包
- [√] web socket 实时通讯服务
- [未完成] 账号注册
- [未完成] 密码修改
- [未完成] 国际化
- [未完成] mock.js 模拟后端返回接口

## 四、截图
* 登录  
![image](https://github.com/huangfushan/source/blob/master/react-cli/login.png)

* 首页  
![image](https://github.com/huangfushan/source/blob/master/react-cli/home.png)

* 群聊通讯  
![image](https://github.com/huangfushan/source/blob/master/react-cli/chat.png)


## 五、布局
```
├── build                               // npm run prod 生成文件夹
├── node_modules                        // 各种依赖包
├── scripts                             // webpack 配置文件,npm 编译对应命令 js 文件
├── ├── build.js                        // 利用 webpack compiler 钩子打包部署，生产 build 文件（npm run build）
├── ├── dev.server.js                   // 启动本地服务（npm start）
├── ├── paths.js                        // 配置各类文件路径
├── ├── socket.server.js                // 启动本地 socket 服务 （npm run socket）
├── ├── webpack.common.js               // webpack 打包编译基础文件
├── ├── webpack.dev.js                  // webpack 本地运行（npm start）
├── ├── webpack.common.js               // webpack 打包部署,生产 build 文件（npm run prod）
├── src                                 // 源码目录
│   ├── api                             // 服务器端接口数据映射 API
│   ├── common                          // 项目公共配置
│   ├── components                      // 页面组件
│   ├── images                          // 图片资源
│   ├── pages                           // 页面
│   ├── redux                           // redux 数据流管理
│   ├── themes                          // less 样式
│   ├── utils                           // 封装的一些常用工具类
│   ├── index.html                      // 程序入口文件
│   ├── index.js                        // 程序入口文件
│   ├── menu.config.js                  // menu 导航配置
│   ├── router.js                       // 页面路由
├── .babelrc                            // babel 配置文件
├── .editorconfig                       // webstore 代码规范配置文件
├── .eslintignore                       // eslint 语法检测忽略文件
├── .eslintrc                           // eslint 语法检测配置文件
├── .gitignore                          // git 忽略文件
├── INTRO.md                            // 项目搭建优化文档
├── package.json                        // 项目依赖 
├── README.md                           // read me 
```

## 六、框架打包优化
详情见优化清单：<a rel="noopener noreferrer" target="_blank" href="https://github.com/huangfushan/react-cli/blob/master/INTRO.md">INTRO.md</a>

* 图片压缩
* css 浏览器兼容
* 热更新/局部热更新
* webpack 分块打包  
* proxy 映射
* eslint 语法检测
* webpack compiler钩子（用于执行 npm run build 指令，未完成）
