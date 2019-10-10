import React, { Component } from 'react';

const S = {
  ROOT: {
    position: 'relative',
    display: 'inline-block',
    backgroundColor: '#e1e1cb',
    width: 250
  },
  INPUT: {
    background: 'transparent none repeat scroll 0 0',
    border: 'medium none',
    outline: 'medium none',
    height: 30,
    paddingLeft: 10,
    color: 'green',
    width: '100%',
    fontSize: '16px',
    fontWeight: 'bold'
  }
};

const _isFn = fn => typeof fn === 'function';

const _maskValue = (len=0) => {
  let i=0, str = '';
  for (i; i<len; i++){
    str = str + 'X'
  }
  return str;
}

class InputSecret extends Component {

  state = {
    value: ''
  }
  secret = ''


  _handleChangeValue = (event) => {
    const _value = event.target.value
    , _length = _value.length
    , _nowLength = this.secret.length;
    if (_length === _nowLength + 1) {
      this.secret = this.secret + _value[_length-1]
    } else if ( _length === _nowLength - 1) {
      this.secret = this.secret.substring(0, _nowLength-1)
    } else if (_nowLength === 0) {
      this.secret = _value
    } else if (_length === 0) {
      this.secret = ''
    }    
    this.setState({
      value: _maskValue(this.secret.length)
    });
  }

  _handleKeyDown = (event) => {
    if (event.keyCode !== 27) {
      event.stopPropagation()
    }
    switch(event.keyCode){
      case 13:
        if (_isFn(this.props.onEnter)) {
          event.preventDefault()
          this.props.onEnter(this.secret)
        }
        break;
      case 27: case 46:
        if (_isFn(this.props.onEnter)) {
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
           spellCheck="false"
           translate="false"
           placeholder={placeholder}
           maxLength={maxLength}
           value={value}
           onChange={this._handleChangeValue}
           onKeyDown={this._handleKeyDown}
        />
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
