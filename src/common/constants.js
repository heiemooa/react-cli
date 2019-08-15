const path = require('./config');

export const C_PROJECT_NAME = path.PROJECT_NAME; //项目名称
export const C_X_CLIENT_TOKEN = path.X_CLIENT_TOKEN; //x-client-token
export const C_SESSION = 'session'; //session

/**
 * 开发者
 * @type {{NAME: string, PATH: string}}
 */
export const C_AUTHOR = {
  TIME: '2019',
  NAME: 'huangfushan',
  PATH: 'https://github.com/huangfushan/react-cli'
};

/**
 * API请求路径
 * @type {{HOST: string, PATH: string}}
 */
export const C_API = {
  HOST_PATH: `${path.debug()}/${path.PROJECT_CODE}/api`, // 基本请求路径"/debug/code/api/具体接口"，线上debug是空，
  TIMEOUT: 15000, //api请求超时时间
};

/**
 * 网络请求后端返回状态吗
 * @type {{ERR_FAIL: number, ERR_401: number, ERR_500: number, ERR_404: number, OK: number}}
 */
export const C_RESP = {
  OK: 0,
  SUCCESS: 200,
  ERR_401: 401,
  ERR_404: 404,
  ERR_500: 500,
  ERR_FAIL: -1000,
};

/**
 * 时间格式
 * @type {{Y: string, M: string, D: string, H: string, m: string, s: string, q: number, S: number}}
 */
export const C_TIME = {
  Y: 'YYYY',
  M: 'YYYY-MM',
  D: 'YYYY-MM-DD',
  H: 'YYYY-MM-DD HH',
  m: 'YYYY-MM-DD HH:mm',
  s: 'YYYY-MM-DD HH:mm:ss',
  q: 0,//季度
  S: 0,//毫秒
};

/**
 * 存入storage缓存，
 * 这里从简，只做了本地和线上的区别，
 * 实际根据产品项目还需要做 开发/测试/正式服的区分
 * @type {{PASSWORD: string, AUTH: string, USERNAME: string}}
 */
export const C_STORAGE = {
  AUTH: `${process.env.NODE_ENV}_${path.PROJECT_CODE}_auth`, //账户信息，是对象
  USERNAME: `${process.env.NODE_ENV}_${path.PROJECT_CODE}_username`, //登录账号
  PASSWORD: `${process.env.NODE_ENV}_${path.PROJECT_CODE}_password`, //登录密码
};

/**
 * 页码
 * @type {{PAGE: number, COUNT: number}}
 */
export const C_PAGE_NUMBER = {
  PAGE: 1,
  COUNT: 10,
};

/**
 * 性别
 * @type {{MAN: string, WOMEN: string, UNKNOWN: string}}
 */
export const C_GENDER = {
  MAN: '男',
  WOMEN: '女',
  UNKNOWN: '未知'
};

/**
 * 学历
 * @type {{JUNIOR: string, MASTER: string, SENIOR: string, COLLEGE: string, UNIVERSITY: string, DOCTOR: string}}
 */
export const C_EDUCATION = {
  JUNIOR: '初中',
  SENIOR: '高中/中专',
  COLLEGE: '大专',
  UNIVERSITY: '本科',
  MASTER: '硕士',
  DOCTOR: '博士',
};

/**
 * 上传文件选择接收类型
 * @type {{IMAGE_ACCEPT: string, VIDEO_ACCEPT: string, AUDIO_ACCEPT: string}}
 */
export const C_FILE = {
  IMAGE_ACCEPT: 'image/png,image/gif,image/jpg,image/jpeg',
  VIDEO_ACCEPT: 'video/mp4',
  AUDIO_ACCEPT: 'audio/mp3',
};
