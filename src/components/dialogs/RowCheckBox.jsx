import React, { Component } from 'react';
//import PropTypes from "prop-types";

import SvgCheckBox from '../zhn/SvgCheckBox'

const STYLE = {
  ROOT : {
    paddingTop: '6px',
    paddingLeft : '16px'
  },
  CAPTION : {
    display: 'inline-block',
    color: 'grey',
    paddingLeft: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    userSelect: 'none',
    cursor: 'pointer'
  },
  CHECKED : {
    color: 'black'
  }
}

class RowCheckBox extends Component {
  /*
  static propTypes = {
    rootStyle : PropTypes.object,
    caption: PropTypes.string,
    initValue: PropTypes.bool,
    onCheck: PropTypes.func,
    onUnCheck: PropTypes.func
  }
  */

  constructor(props){
    super()
    this.state = {
      isChecked: !!props.initValue
    }
  }

  _handleCheck = () => {
    const { onCheck } = this.props;
    if (typeof onCheck == 'function'){
      onCheck()
    }
    this.setState({ isChecked: true })
  }
  _handleUnCheck = () => {
    const { onUnCheck } = this.props;
    if (typeof onUnCheck == 'function'){
      onUnCheck()
    }
    this.setState({ isChecked: false })
  }
  _handleToggle = () => {
    const { isChecked } = this.state;
    if (isChecked) {
      this._handleUnCheck()
    } else {
      this._handleCheck()
    }
  }

  render(){
    const { rootStyle, caption } = this.props
        , { isChecked } = this.state
        , _style = isChecked ? STYLE.CHECKED : null;
    return (
      <div style={{...STYLE.ROOT, ...rootStyle}}>
        <SvgCheckBox
          value={isChecked}
          onCheck={this._handleCheck}
          onUnCheck={this._handleUnCheck}
        />
        {
          caption && (
            <span
              style={{...STYLE.CAPTION, ..._style }}
              onClick={this._handleToggle}
            >
              {caption}
            </span>
          )
        }
      </div>
    );
  }
}

export default RowCheckBox
