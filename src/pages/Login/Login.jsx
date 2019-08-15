import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import md5 from 'md5';
import { C_RESP, C_STORAGE } from '../../common/constants';
import { getStorage, removeStorage, setStorage } from '../../utils';
import { AsyncActions } from '../../redux/actions';
import LogoMotion from '../../components/LogoMotion';
import { Button } from '../../components/widget';
import './login.less';

@connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated
  }),
  {
    signIn: AsyncActions.signIn
  }
)
export default class Login extends React.Component {

  static propTypes = {
    signIn: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    isAuthenticated: false
  };

  state = {
    username: '',
    password: '',
    notice: '',
    isConfirmLoading: false
  };

  componentWillMount () {
    const username = getStorage(C_STORAGE.USERNAME);
    const password = getStorage(C_STORAGE.PASSWORD);

    this.setState({
      username,
      password
    });
  }

  handleSubmit = () => {
    if (this.state.isConfirmLoading) return;
    let { username, password, remember } = this.form;
    if (!username.value || !password.value) {
      this.setState({
        notice: `请输入${!username.value ? '账号' : '密码'}`
      });
      return;
    }
    if (remember.checked) {
      setStorage(C_STORAGE.USERNAME, username.value);
      setStorage(C_STORAGE.PASSWORD, password.value);
    } else {
      removeStorage(C_STORAGE.PASSWORD);
    }
    this.setState({ isConfirmLoading: true });
    this.props.signIn({ username: username.value, password: md5(password.value) }).then(resp => {
      if (resp.status !== C_RESP.OK) {
        this.setState({
          notice: resp.notice
        });
      }
      if (resp.status !== C_RESP.OK) {
        this.setState({ isConfirmLoading: false });
      }
    });
  };

  render () {
    const { username, password } = this.state;
    return this.props.isAuthenticated ? <Redirect to='/' /> : (
      <div className="page-login">
        <div className="page-login-bg">
          <LogoMotion />
          <p className="page-login-bg-logo">REACT-CLI</p>
        </div>
        <form className="page-login-form" ref={form => this.form = form}>
          <div className="flex-center page-login-form-row">
            <p className="title">账号：</p>
            <input type="text" name="username" placeholder="请输入账号" defaultValue={username} />
          </div>
          <div className="flex-center page-login-form-row">
            <p className="title">密码：</p>
            <input type="password" name="password" placeholder="请输入密码" defaultValue={password} />
          </div>
          <p className="page-login-notice error-color">{this.state.notice}</p>
          <div className="page-login-form-row flex-between">
            <p className="flex">
              <input id="remember" type="checkbox" value="记住密码" defaultChecked />
              <label htmlFor="remember">记住密码</label>
            </p>
            <Link to="/account/password_find">忘记密码</Link>
          </div>
          <div className="page-login-form-row text-align-center">
            <Button type="submit" className="btn-login" onClick={this.handleSubmit}>
              {
                this.state.isConfirmLoading ? '登录中..' : '登录'
              }
            </Button>
          </div>
          <div className="page-login-form-row text-align-center">
            <Link to="/account/register" className="go-register">立即注册</Link>
          </div>
        </form>
      </div>
    );
  }
}
