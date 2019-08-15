/**
 * Created by huangfushan on 2019-08-12 09:06
 */
import { createActions } from 'redux-actions';
import { HashRouter } from 'react-router-dom';
import authApi from '../api/authApi';
import { C_RESP, C_SESSION, C_STORAGE } from '../common/constants';
import { http, removeStorage, setStorage } from '../utils';
//
// 该文件包含所有 Redux 的 Action，`redux-actions` 文档看这里: https://redux-actions.js.org
// 为了可读性，每一个 action 只能占用一行，可以将相关的 actions 放到一个内嵌对象中。
//
// AsyncActions 为异步 action, 具体参考 `redux-thunk` 库，异步方法定义必须放到 actions
// 目录中，
//

const Actions = createActions({
  auth: {
    updateAuth: auth => ({
      ...auth,
      username: auth.username || '',
      isAuthenticated: true
    }),
    clearAuth: () => {
      removeStorage(C_STORAGE.AUTH);
      const router = new HashRouter();
      router.history.push('/login');
      return {
        session: '',
        isAuthenticated: false,
        username: ''
      };
    }
  },
});

const AsyncActions = {
  signIn: params => dispatch => authApi.signIn(params).then(resp => {
    if (resp.status === C_RESP.OK) {
      http.setHeader(C_SESSION, resp.data.session);
      setStorage(C_STORAGE.AUTH, resp.data); //session
      dispatch(Actions.auth.updateAuth(resp.data));
    }
    return resp;
  }),
  signOut: () => dispatch => authApi.signOut().then(resp => {
    switch (resp.status) {
      case C_RESP.OK :
        dispatch(Actions.auth.clearAuth());
        break;
      case C_RESP.ERR_401:
        dispatch(Actions.auth.clearAuth());
        break;
      default:
        break;
    }
  }),
};

// export default merge(Actions, AsyncActions);
export {
  Actions,
  AsyncActions
};
