import React, { Component } from 'react';

const S = {
  ROOT: {
    position: 'relative',
    display: 'inline-block',
    width: 275,
    backgroundColor: '#e1e1cb'
  },
  INPUT: {
    color: 'green',
    width: '100%',
    height: 30,
    paddingLeft: 10,
    background: 'transparent none repeat scroll 0 0',
    border: 'medium none',
    outline: 'medium none',
    fontSize: '16px',
    fontWeight: 'bold'
  }
};

class InputSecret extends Component {

  static defaultProps = {
    maxLength: "32",
    onEnter: () => {}
  }

  state = {
    value: ''
  }

  _hInputChange = (event) => {
    this.setState({
      value: event.target.value.trim(),
    })
  }

  _clearAttrValue = () => {
    this._clearId = setTimeout(() => {
      const _input = this._input;
      if (_input && _input.hasAttribute('value')) {
        _input.removeAttribute('value')
      }
    })
  }

  _hKeyDown = (event) => {
    if (event.keyCode !== 27) {
      event.stopPropagation()
    }
    switch(event.keyCode){
      case 13:
        event.preventDefault()
        this.props.onEnter(this.state.value)
        break;
      case 27: case 46:
        this.props.onEnter('')
        this.clear();
        break;
      default: return;
    }
  }


  _refInput = n => this._input = n

  render(){
    const {
      name,
      placeholder,
      maxLength
    } = this.props
    , { value } = this.state;
    return (
      <div style={S.ROOT}>
        <input
            hidden={true}
            autoComplete="username"
            value={name}
            readOnly={true}
        />
        <input
           ref={this._refInput}
           style={S.INPUT}
           type="password"
           autoComplete="current-password"
           placeholder={placeholder}
           maxLength={maxLength}
           value={value}
           onChange={this._hInputChange}
           onKeyDown={this._hKeyDown}
        />
      </div>
    )
  }

  componentDidUpdate() {
    this._clearAttrValue()
  }

  getValue(){
    return this.state.value;
  }
  clear(){
    this.setState({ value: '' })
  }
}

export default InputSecret
