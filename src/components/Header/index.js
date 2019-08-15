/**
 * Created by huangfushan on 2019-08-13 14:40
 */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { common, icon } from '../../images';
import { headerMenus } from '../../menu.confg';
import { AsyncActions } from '../../redux/actions';
import './index.less';

@connect(
  state => ({
    username: state.auth.username,
    isAuthenticated: state.auth.isAuthenticated,
  }),
  {
    singOut: AsyncActions.signOut
  }
)
@withRouter
export default class Header extends React.Component {

  static propTypes = {
    singOut: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
  };

  static defaultProps = {
    username: ''
  };

  handleSignOut = () => {
    this.props.singOut();
  };

  render () {
    const { pathname } = this.props.location;
    return (
      <div className="header-menu flex">
        <div className="header-menu-logo">
          <img src={common.logo} />
        </div>
        <div className="header-menu-left">
          {
            headerMenus && headerMenus.map((item, index) => (
              <Link to={item.path} key={index} className={pathname === item.path ? 'active' : ''}>{item.name}</Link>
            ))
          }
        </div>
        <div className="header-menu-right">
          <Link to='/star' className={pathname === '/star' ? 'active' : ''}>
            <img src={icon.cart} alt="cart" />
          </Link>
          <Link to='/chat' className={pathname === '/chat' ? 'active' : ''}>
            <img src={icon.chat} alt="cart" />
          </Link>
          <a>
            <img src={icon.language} alt="cart" />
          </a>
          {
            this.props.isAuthenticated ? (
              <div className="account">
                <span>{this.props.username}</span>
                <span onClick={this.handleSignOut}>退出</span>
              </div>
            ) : <Link to="/login">登录</Link>
          }
        </div>
      </div>
    );
  }
}
