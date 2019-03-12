import React, { Component } from 'react';
//import PropTypes from "prop-types";

import Model from '../../constants/Model'
import InputText from '../zhn/InputText'
import CellColor from '../zhn-moleculs/CellColor'
import ModalPalette from '../zhn-moleculs/ModalPalette'

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
  INPUT_TEXT: {
    width: 80,
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  },
  COLOR: {
    position: 'relative',
    display: 'inline-block',
    height: 32,
    width: 32,
    borderRadius: 2,
    verticalAlign: 'bottom',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  }
}

class RowInputColor extends Component {
  /*
  static propTypes = {
    styleRoot: PropTypes.object,
    styleCaption: PropTypes.object,
    styleInput: PropTypes.object,
    caption: PropTypes.string,
    initValue: PropTypes.string,
    onEnter: PropTypes.func
  }
  */

  static defaultProps = {
    caption: 'Color:',
    initValue: '#90ed7d',
    onEnter: () => {}
  }

  constructor(props){
    super(props)
    const { initValue } = props
    this.state = {
      initValue: initValue,
      value: initValue,
      isShowPallete: false
    }
  }

  static getDerivedStateFromProps({ initValue }, state) {
    return initValue !== state.initValue
      ? { initValue, value: initValue }
      : null;
  }

  _hEnter = (value) => {
    this.props.onEnter(value)
    this.setState({ value })
  }

  _hRegCellColor = (node) => {
    this.cellColorNode = node
  }

  _hClickPallete = (color, event) => {
    if (event.target === this.cellColorNode) {
      this.setState(prevState => ({
        isShowPallete: !prevState.isShowPallete
      }))
    }
  }

  _hClosePalette = (event) => {
     this.setState({ isShowPallete: false })
  }

  render(){
    const {
        styleRoot, styleCaption, styleInput,
        caption
      } = this.props
    , { isShowPallete, value } = this.state
    , _caption = caption.indexOf(':') !== -1
         ? caption
         : `${caption}:`
    , _bgColor = { backgroundColor: value };
    return (
      <div style={{...S.ROOT, ...styleRoot}}>
        <label>
          <span style={{...S.CAPTION, ...styleCaption}}>
            {_caption}
          </span>
          <InputText
             style={{...S.INPUT_TEXT, ...styleInput}}
             initValue={value}
             onEnter={this._hEnter}
          />
        </label>
        <CellColor
          style={{ ...S.COLOR, ..._bgColor}}
          onReg={this._hRegCellColor}
          onClick={this._hClickPallete}
        >
          <ModalPalette
             isShow={isShowPallete}
             model={Model.palette}
             onClickCell={this._hEnter}
             onClose={this._hClosePalette}
          />
        </CellColor>
      </div>
  );
 }
}

export default RowInputColor
