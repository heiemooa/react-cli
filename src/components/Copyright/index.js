/**
 * Created by huangfushan on 2019-08-15 10:21
 */
import React from 'react';
import { C_AUTHOR } from '../../common/constants';

export default () => {
  return (
    <div className="copyright">
      Copyright &copy; {C_AUTHOR.TIME} &nbsp;&nbsp;
      <a href={C_AUTHOR.PATH} target="view_window">{C_AUTHOR.NAME}</a>
    </div>
  );
};
