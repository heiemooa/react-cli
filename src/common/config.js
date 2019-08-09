const PROJECT_NAME = 'webpack4'; //项目名称
const PROJECT_CODE = 'p10000'; //项目code
const PROJECT_PORT = 'cms'; //端
const PROJECT_HOST_PROD = 'https://zhengshi.com'; //正式服
const PROJECT_HOST_TEST = 'https://ceshi.com'; //测试服
const PROJECT_HOST_DEV = 'https://kaifa.com'; //开发服
const DEBUG = {
  postman: '/postman', //postman
  dev: '/dev', //开发服
  test: '/test', //测试服
  prod: '/prod', //正式服
};
const PROXY = {
  "/dev": {
    "target": PROJECT_HOST_DEV,
    "secure": false,
    "changeOrigin": true,
    "pathRewrite": {
      "^/dev": ""
    }
  },
  "/test": {
    "target": PROJECT_HOST_TEST,
    "secure": false,
    "changeOrigin": true,
    "pathRewrite": {
      "^/test": ""
    }
  },
  "/prod": {
    "target": PROJECT_HOST_PROD,
    "secure": false,
    "changeOrigin": true,
    "pathRewrite": {
      "^/prod": ""
    }
  },
  "/postman": {
    "target": "https://mock.pstmn.io",
    "secure": false,
    "changeOrigin": true,
    "pathRewrite": {
      "^/postman/p10000/api": ""
    }
  },
}

module.exports = {
  PROJECT_NAME,
  PROJECT_CODE,
  PROJECT_PORT,
  PROXY,
  X_CLIENT_TOKEN: `${PROJECT_CODE}:${PROJECT_PORT}`,
  // PROJECT_HOST_PROD,
  // PROJECT_HOST_TEST,
  // PROJECT_HOST_DEV,

  //如果是本地，则返回当前环境映射路径
  debug: () => {
    if (process.env.NODE_ENV === 'production') {
      return '';
    }
    return DEBUG.postman;
  },
};
