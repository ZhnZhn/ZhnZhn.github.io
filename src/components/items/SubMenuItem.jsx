import React, { Component } from 'react';
//import PropTypes from "prop-types";

const CL = "bt-sub-item";

const STYLE = {
  ACTIVE : {
    color: '#a487d4',
    fontWeight: 'bold'
  }
}

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

  _handleClick = () => {
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
        ? STYLE.ACTIVE
        : null;

    return(
      <div
        className={CL}
        style={_style}
        onClick={this._handleClick}
      >
        {caption}
      </div>
    )
  }
}

export default SubMenuItem
