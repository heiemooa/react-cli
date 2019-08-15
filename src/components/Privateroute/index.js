/**
 * 自定义必须是已经登录的route
 * Created by huangfushan on 2019-08-15 10:49
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, withRouter, Redirect } from 'react-router-dom';

@connect(
  state => ({
    isAuthenticated: state.auth.isAuthenticated
  })
)
@withRouter
export default class PrivateRoute extends Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    component: PropTypes.func,
  };

  render () {
    let { component: Component, isAuthenticated, ...rest } = this.props;
    return (
      <Route {...rest} render={(props) => (
        isAuthenticated ? <Component {...props} /> : <Redirect to='/login' />
      )} />
    );
  }
}
