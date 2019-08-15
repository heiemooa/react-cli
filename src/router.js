import { hot } from 'react-hot-loader/root';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
import LoadingComponent from './components/LoadingComponent';
import Loadable from 'react-loadable';
import { Actions } from './redux/actions';
import { getStorage, http } from './utils';
import { C_SESSION, C_STORAGE } from './common/constants';
import PrivateRoute from './components/Privateroute';

const Login = Loadable({
  loader: () => import('./pages/Login'),
  loading: LoadingComponent,
  delay: 100
});

const Home = Loadable({
  loader: () => import('./pages/Home'),
  loading: LoadingComponent,
  delay: 100
});

const Mall = Loadable({
  loader: () => import('./pages/Mall'),
  loading: LoadingComponent,
  delay: 100
});

const Journey = Loadable({
  loader: () => import('./pages/Journey'),
  loading: LoadingComponent,
  delay: 100
});

const About = Loadable({
  loader: () => import('./pages/About'),
  loading: LoadingComponent,
  delay: 100
});

const Chat = Loadable({
  loader: () => import('./pages/Chat'),
  loading: LoadingComponent,
  delay: 100
});
@connect(
  null,
  {
    updateAuth: Actions.auth.updateAuth,
  }
)
class Routers extends React.Component {

  static propTypes = {
    updateAuth: PropTypes.func.isRequired,
  };

  componentWillMount () {
    const auth = getStorage(C_STORAGE.AUTH) && JSON.parse(getStorage(C_STORAGE.AUTH));
    if (auth && auth.session) {
      http.setHeader(C_SESSION, auth.session);
      this.props.updateAuth(auth);
    }
  }

  render () {
    return (
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          <PrivateRoute path='/chat' component={Chat} />
          <Route path='/mall' component={Mall} />
          <Route path='/journey' component={Journey} />
          <Route path='/about' component={About} />
          <Route path='/' component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default hot(Routers);
