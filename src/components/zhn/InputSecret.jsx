import React, { Component } from 'react';

const styles = {
  rootDiv: {
    position: 'relative',
    display: 'inline-block',
    backgroundColor: '#E1E1CB',
    width: '250px'
  },
  inputText: {
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
}

class InputSecret extends Component {
  state = {
    value: ''
  }

  _handleChangeValue = (event) => {
    this.setState({ value: event.target.value });
  }

  /*
  _handlerBlurValue = () => {
  }
  */

  render(){
    const {placeholder} = this.props
        , { value } = this.state;
    return (
      <div style={styles.rootDiv}>
        <input
           autocomplete="off"
           type="password"
           style={styles.inputText}
           translate={false}
           placeholder={placeholder}
           value={value}
           onChange={this._handleChangeValue}
           //onBlur={this._handlerBlurValue}
        >
        </input>
      </div>
    )
  }

  getValue(){
    return this.state.value;
  }
}

export default InputSecret
