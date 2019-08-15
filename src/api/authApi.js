/**
 * Created by huangfushan on 2019-08-12 09:06
 */
import { http } from '../utils';

export default {
  signIn: params => http.post(`/auth`, params), // 登录
  signOut: () => http.delete(`/auth`), // 登出
  changePassword: params => http.patch(`/cms/auth/password`, params), //修改密码
  getUser: () => http.get(`/cms/auth`), //获取用户信息
};
