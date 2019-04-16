import React, { Component } from 'react';
//import PropTypes from "prop-types";

import InputPattern from '../../zhn/InputPattern'
import useRow from './useRow'

class RowPattern extends Component {
  /*
  static propTypes = {
     isShowLabels: PropTypes.bool,
     caption : PropTypes.string
     captionStyle: PropTypes.object
  }
  */

  _refInput = c => this.inputPattern = c

  render(){
    const {
      isShowLabels,
      caption, captionStyle,
      ...rest
    } = this.props
    , {
      rowStyle, labelStyle,
      caption:_caption
    } = useRow({
      isShowLabels, caption, captionStyle
    });
    return (
      <div style={rowStyle}>
        <span style={labelStyle}>
           {_caption}
        </span>
        <InputPattern
           ref={this._refInput}
           {...rest}
        />
     </div>
    );
  }

  getValue(){
    return this.inputPattern.getValue();
  }
  isValid(){
    return this.inputPattern.isValid();
  }
}

export default RowPattern
