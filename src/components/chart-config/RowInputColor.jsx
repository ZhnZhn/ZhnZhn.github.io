import React, { Component, PropTypes } from 'react'

import InputText from '../zhn/InputText'

const STYLE = {
  ROOT : {
    paddingTop : '6px',
    paddingBottom : '6px',
    paddingRight : '6px'
  },
  CAPTION : {
    color: 'rgb(27, 117, 187)',
    display: 'inline-block',
    textAlign: 'right',
    width: '80px',
    paddingRight: '5px',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  INPUT_TEXT : {
    width: '80px',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  },
  COLOR: {
    display: 'inline-block',
    height: '32px',
    width: '32px',
    borderRadius: '2px',
    verticalAlign: 'bottom',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  }
}

class RowInputColor extends Component {
  static propTypes = {
    styleRoot: PropTypes.object,
    styleCaption: PropTypes.object,
    styleInput: PropTypes.object,
    caption: PropTypes.string,
    initValue: PropTypes.string,
    onEnter: PropTypes.func
  }

  constructor(props){
    super()
    this.state = {
      value: props.initValue
    }
  }

  componentWillReceiveProps(nextProps){
    if (this.props !== nextProps){
      this.setState({ value: nextProps.initValue })
    }
  }

  _handleEnter = (value) => {
    this.props.onEnter(value)
    this.setState({ value })
  }

  render(){
    const { styleRoot, styleCaption, styleInput, caption } = this.props
        , { value } = this.state
        , _bgColor = { backgroundColor: value };
    return (
      <div style={{...STYLE.ROOT, ...styleRoot}}>
        <label>
          <span style={{...STYLE.CAPTION, ...styleCaption}}>
            {caption}
          </span>
          <InputText
             style={{...STYLE.INPUT_TEXT, ...styleInput}}
             initValue={value}
             onEnter={this._handleEnter}
          />
        </label>
        <span style={{ ...STYLE.COLOR, ..._bgColor}}>
        </span>
      </div>
  );
 }
}

export default RowInputColor
