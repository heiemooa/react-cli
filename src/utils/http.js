/**
 * Created by huangfushan on 2019-08-12 09:07
 */

import Axios from 'axios';
import { C_API, C_RESP, C_X_CLIENT_TOKEN } from '../common/constants';

const code = {
  400: '请求错误',
  401: '未授权，请登录',
  403: '拒绝访问',
  404: '请求地址不存在',
  408: '请求超时',
  500: '服务器内部错误',
  501: '服务未部署或正在部署中',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
  505: 'HTTP版本不受支持',
};

const httpResponse = (resp) => {
  if (resp.status === 200) {
    const data = resp.data;
    if (data.status === C_RESP.OK) {
      return resp.data;
    }
    return {
      status: data.status,
      url: resp.config.url,
      notice: data.notice,
      msg: data.msg,
    };
  } else {
    return Promise.reject(resp);
  }
};

const httpCatch = (error) => {
  if (error.response && error.response.data) {
    return {
      status: error.response.status,
      url: error.config.url,
      notice: error.response.data.notice,
      msg: code[error.response.status] || error.message,
    };
  } else {
    return {
      status: null,
      msg: error.message,
    };
  }
};

class HTTP {
  constructor (host, timeout, config) {
    this._agent = Axios.create({
      baseURL: host,
      timeout: timeout,
      ...config,
    });

    //请求拦截器
    this._agent.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么
      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    });

    // 添加响应拦截器
    this._agent.interceptors.response.use(function (response) {
      // 对响应数据做点什么
      return response;
    }, function (error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    });
  }

  //动态设置自定义请求头
  setHeader = (key, value) => {
    if (!key || !value) return;
    this._agent.defaults.headers.common[key] = value;
  };

  //移除多余请求头
  removeHeader = (key) => {
    if (!key) return;
    delete this._agent.defaults.headers.common[key];
  };

  get = (url, params = {}) => {
    return this._agent.get(url, params).then(httpResponse).catch(httpCatch);
  };

  post = (uri, params) => {
    return this._agent.post(uri, params).then(httpResponse).catch(httpCatch);
  };

  put = (uri, params) => {
    return this._agent.put(uri, params).then(httpResponse).catch(httpCatch);
  };

  patch = (uri, params) => {
    return this._agent.patch(uri, params).then(httpResponse).catch(httpCatch);
  };

  delete = (uri, params) => {
    return this._agent.delete(uri, params).then(httpResponse).catch(httpCatch);
  };
}

const http = new HTTP(
  C_API.HOST_PATH,
  C_API.TIMEOUT,
  {
    headers: {
      'X-Client-Token': C_X_CLIENT_TOKEN,
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }
);

export default http;
