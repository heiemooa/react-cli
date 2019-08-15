/**
 * Created by huangfushan on 2019-08-12 16:35
 */
import React from 'react';
import Header from '../../components/Header';
import './index.less';

export default class Home extends React.Component {

  render () {
    return (
      <div className="page-home">
        <Header />
        <div className="page-home-container">
          <h1>Welcome !!</h1>
          <ul>
            <h2>初心</h2>
            <li>搭建这套框架的初心是为了不依赖于任何第三方脚手架，从 0-1 搭建一套最新依赖的 react 前端基础脚手架，用于快速的实现项目需求的开发；</li>
            <li>登录页面基础功能已经实现了，现在可以大胆的根据实际需求开发了；</li>
            <li>为了尽可能的适应多种实际场景，所以并没有安装多余的 UI 库，如 antd、element-ui、Material-UI 等，为的是让大家能根据实际项目酌情使用。</li>
          </ul>
          <ul>
            <h2>功能清单：</h2>
            <a>（已完成）</a>
            <li>项目按路由模块加载；</li>
            <li>登录/登出；</li>
            <li>redux 数据流管理；</li>
            <li>proxy 接口映射；</li>
            <li>web socket server 实时通讯（如果要开启 socket，可以执行 npm run socket 进行启动，访问地址：localhost:8081）。</li>
            <li>优化：react-hot-loader 热加载，webpack 项目打包优化（分块/图片压缩等），eslint 语法检测等，具体看：
              <a rel="noopener noreferrer" target="_blank"
                 href="https://github.com/huangfushan/react-cli/blob/master/INTRO.md">优化清单</a>
            </li>
            <a>（未完成）</a>
            <li>本地 mock.js 服务器，模拟后端接口（暂时可以通过 promise 实现快速登录）；</li>
            <li>其他功能完善：修改密码、注册等;</li>
            <li>未完待续。。</li>
          </ul>
          <ul>
            <h2>关于 PC 管理后台</h2>
            <li>之前结合create-react-app已经搭了一套完整的 CMS 框架；</li>
            <li>基于 webpack3， babel7 环境，感兴趣可以自定读取：<a href="https://github.com/huangfushan/react-cms.git"
                                                    rel="noopener noreferrer" target="_blank">react-cms</a></li>
            <li>基础功能包含了：阿里对象存储 oss，腾讯音视频存储 vod，图片裁剪react-cropper，富文本 quill.js等；</li>
            <li>不过目前没有配备后端的项目，所以 npm start 起来之后，可能无法正常上传文件，可以根据代码更改 api 请求路径为自己项目实际地址。</li>
          </ul>
          <ul>
            <h2>关于 PC 客户端</h2>
            <li>关于 PC 客户端无非是 "官网" 和 "商城" 两种场景</li>
            <li>说实在的，我目前还没完整的一套方案，我有可能官网用 React 开发，商城用 Vue 开发。</li>
          </ul>
        </div>
      </div>
    );
  }
}
