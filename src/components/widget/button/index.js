/**
 * Created by huangfushan on 2019-08-12 20:16
 */

import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

export default class Button extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func,
  };

  state = {
    isChecked: false
  };

  handleClick = (e) => {
    this.setState({
      isChecked: !this.state.isChecked
    });
    const { onClick } = this.props;
    if (onClick) {
      onClick(e);
    }
  };

  render () {

    let { isChecked } = this.state;
    let { className } = this.props;
    return (
      <span className={`hfs-button ${isChecked ? 'hfs-button-active' : ''} ${className}`} onClick={this.handleClick}>
        {
          this.props.children
        }
      </span>
    );
  }
}
