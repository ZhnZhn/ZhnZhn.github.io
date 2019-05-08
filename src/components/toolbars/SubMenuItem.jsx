import React, { Component } from 'react';
//import PropTypes from "prop-types";

const CL = "bt-sub-item";

const S = {
  ACTIVE: {
    fontWeight: 'bold'
  }
};

const _isFn = fn => typeof fn === 'function';

class SubMenuItem extends Component{
  /*
  static propTypes = {
    caption: PropTypes.string,
    initialIsActive: PropTypes.bool,
    isNotActive: PropTypes.bool,
    onClick: PropTypes.func
  }
  */
  static defaultProps = {
    initialIsActive: false
  }

  constructor(props){
    super(props)
    this.state = {
      isActive: props.initialIsActive
    }
  }

  _hClick = () => {
    this.props.onClick()
    this.setState(prev => ({
      isActive: !prev.isActive
    }))
  }

  render(){
    const { caption, isNotActive, onClick  } = this.props;
    if ( !_isFn(onClick) ){
      return null;
    }

    const { isActive } = this.state
    , _style = (isActive && !isNotActive)
        ? S.ACTIVE
        : null;

    return(
      <button
        className={CL}
        style={_style}
        onClick={this._hClick}
      >
        {caption}
      </button>
    )
  }
}

export default SubMenuItem
