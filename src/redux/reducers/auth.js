/**
 * Created by huangfushan on 2019-08-12 09:06
 */
import { handleActions } from 'redux-actions';
import { Actions } from '../actions';

const INITIAL_STATE = {
  session: '',
  phone: '',
  account: '',
  username: '',
  isAuthenticated: false, //是否处于登录状态
  isLinkSocket: false, // 是否连接socket
};

export default handleActions({
  [Actions.auth.updateAuth]: (state, { payload: user }) => ({ ...state, ...user }),
  [Actions.auth.clearAuth]: (state, { payload: user }) => ({ ...state, ...user }),
}, INITIAL_STATE);
