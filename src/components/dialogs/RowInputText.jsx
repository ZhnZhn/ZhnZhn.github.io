import React, { Component } from 'react';
//import PropTypes from "prop-types";

import InputText from '../zhn/InputText'

const S = {
  ROOT: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingRight: 6
  },
  CAPTION: {
    display: 'inline-block',
    color: '#1b75bb',
    textAlign: 'right',
    width: 100,
    paddingRight: 5,
    fontSize: 16,
    fontWeight: 'bold'
  },
  INPUT_TEXT : {
    width: 220,
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  }
}

const COLLON = ':';

class RowInputText extends Component {
  /*
  static propTypes={
    styleRoot: PropTypes.object,
    styleCaption: PropTypes.object,
    styleInput: PropTypes.object,
    caption: PropTypes.string,
    initValue: PropTypes.string,
    onEnter: PropTypes.func
  }
  */
  static defaultProps = {
    caption: 'Input'
  }

  _refInput = (node) => this._inputComp = node

  render(){
    const {
      styleRoot, rootStyle,
      captionStyle, styleCaption,
      caption,
      inputStyle, styleInput,
      ...rest
    } = this.props
    , _rootStyle = rootStyle
         || {...S.ROOT, ...styleRoot}
    , _captionStyle = captionStyle
         || {...S.CAPTION, ...styleCaption}
    , _inputStyle = inputStyle
         || {...S.INPUT_TEXT, ...styleInput}
    , _caption = caption.indexOf(COLLON) === -1
        ? caption + COLLON
        : caption;
    return (
      <div style={_rootStyle}>
        <label>
          <span style={_captionStyle}>
            {_caption}
          </span>
          <InputText
             ref={this._refInput}
             style={_inputStyle}
             {...rest}
          />
        </label>
      </div>
    );
  }

  getValue(){
    return this._inputComp.getValue();
  }
}

export default RowInputText
