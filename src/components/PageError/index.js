/**
 * 错误页面
 * Created by huangfushan on 2019-08-15 09:35
 */
import React from 'react';
import { icon } from '../../images';

export default () => {
  return (
    <div style={style}>
      <img src={icon.error} alt='' style={{ width: '10rem' }} />
      <p>运行错误，请刷新浏览器重试~</p>
    </div>
  );
};

const style = {
  textAlign: 'center',
  paddingTop: '4rem'
};
