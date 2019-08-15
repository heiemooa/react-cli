/**
 * Created by huangfushan on 2019-08-14 19:39
 */
import React from 'react';
import Header from '../../components/Header';

export default class Mall extends React.Component {

  render () {
    return (
      <React.Fragment>
        <Header />
        <div style={{ textAlign: 'center', height: 200, lineHeight: '200px' }}>平台商城页面</div>
      </React.Fragment>
    );
  }
}
