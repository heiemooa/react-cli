const PROJECT_NAME = 'react-cli'; //项目名称
const PROJECT_CODE = 'p19000'; //项目code,一般根据年份+项目代号
const PROJECT_PORT = 'cms'; //端
const PROJECT_HOST_PROD = 'https://prod.com'; //正式服地址
const PROJECT_HOST_TEST = 'https://test.com'; //测试服地址
const PROJECT_HOST_DEV = 'https://dev.com'; //开发服地址
const PROJECT_HOST_MOCK = 'https://mock.com'; //mock地址
const DEBUG = {
  mock: '/mock', //mock
  dev: '/dev', //开发服
  test: '/test', //测试服
  prod: '/prod', //正式服
};
const PROXY = {
  '/dev': {
    'target': PROJECT_HOST_DEV,
    'secure': false,
    'changeOrigin': true,
    'pathRewrite': {
      '^/dev': ''
    }
  },
  '/test': {
    'target': PROJECT_HOST_TEST,
    'secure': false,
    'changeOrigin': true,
    'pathRewrite': {
      '^/test': ''
    }
  },
  '/prod': {
    'target': PROJECT_HOST_PROD,
    'secure': false,
    'changeOrigin': true,
    'pathRewrite': {
      '^/prod': ''
    }
  },
  '/mock': {
    'target': PROJECT_HOST_MOCK,
    'secure': false,
    'changeOrigin': true,
    'pathRewrite': {
      '^/postman/p19000/api': ''
    }
  },
};

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
    return DEBUG.mock;
  },
};
