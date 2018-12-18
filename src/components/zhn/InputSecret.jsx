import React, { Component } from 'react';

const S = {
  ROOT: {
    position: 'relative',
    display: 'inline-block',
    backgroundColor: '#E1E1CB',
    width: '250px'
  },
  INPUT: {
    background: 'transparent none repeat scroll 0 0',
    border: 'medium none',
    outline: 'medium none',
    height: '30px',
    paddingLeft: '10px',
    color: 'green',
    width: '100%',
    fontSize: '16px',
    fontWeight: 'bold'
  }
};

const _maskValue = (len=0) => {
  let i=0, str = ''
  for (i; i<len; i++){
    str = str + 'X'
  }
  return str;
}

class InputSecret extends Component {

  state = {
    value: ''
  }


  _handleChangeValue = (event) => {
    this.secret = event.target.value;
    this.setState(prevState => {
      prevState.value = _maskValue(this.secret.length)
      return prevState;
    });
  }

  _handleKeyDown = (event) => {
    if (event.keyCode !== 27) {
      event.stopPropagation()
    }
    switch(event.keyCode){
      case 13:
        if (typeof this.props.onEnter === 'function') {
          this.props.onEnter(this.secret)
        }
        break;
      case 27: case 46:
        if (typeof this.props.onEnter === 'function') {
          this.props.onEnter('')
        }
        this.clear();
        break;
      default: return;
    }
  }

  render(){
    const { placeholder, maxLength="32" } = this.props
        , { value } = this.state;
    return (
      <div style={S.ROOT}>
        <input
           style={S.INPUT}
           type="password"
           name="secret"
           //autoComplete="new-secret"
           autoComplete="off"
           autoCorrect="off"
           autoCapitalize="off"
           spellCheck={false}
           translate={false}
           placeholder={placeholder}
           maxLength={maxLength}
           value={value}
           onChange={this._handleChangeValue}
           onKeyDown={this._handleKeyDown}
        >
        </input>
      </div>
    )
  }

  getValue(){
    return this.secret;
  }
  clear(){
    this.secret = ''
    this.setState({ value: '' })
  }
}

export default InputSecret
