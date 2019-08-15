/**
 * 页面加载过度页面
 * Created by huangfushan on 2019-08-15 09:34
 */
import React from 'react';
import Error from '../PageError';
import Loading from '../Loading';

const LoadingComponent = (props) => {
  if (props.error) {
    return <Error />;
  } else if (props.pastDelay) {
    //300ms之后显示
    return <Loading />;
  } else {
    return null;
  }
};

export default LoadingComponent;
