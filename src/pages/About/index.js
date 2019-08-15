/**
 * Created by huangfushan on 2019-08-14 19:39
 */
import React from 'react';
import Header from '../../components/Header';

export default class About extends React.Component {

  render () {
    return (
      <React.Fragment>
        <Header />
        <div style={{ textAlign: 'center', height: 200, lineHeight: '200px' }}>关于我们</div>
      </React.Fragment>
    );
  }
}
