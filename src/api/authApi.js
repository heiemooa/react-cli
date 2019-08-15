/**
 * Created by huangfushan on 2019-08-12 09:06
 */
import { http } from '../utils';

export default {
  signIn: params => http.post(`/auth`, params), // 登录
  // signIn: () => Promise.resolve({
  //   status:0,
  //   notice:'',
  //   msg:'',
  //   data: {
  //     session: 'session',
  //     username: '黄沐'
  //   }
  // }), // 登录
  signOut: () => http.delete(`/auth`), // 登出
  changePassword: params => http.patch(`/auth/password`, params), //修改密码
  getUser: () => http.get(`/auth`), //获取用户信息
};
