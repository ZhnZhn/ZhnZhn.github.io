import React from 'react';

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

const InputSecret = React.createClass({
  getInitialState(){
    return {
      value : ''
    }
  },

  _handlerChangeValue(event){

    /*
    if (!this.props.onTest(this.state.value)) {
      this.state.isValid = false;
    } else {
      this.state.isValid = true;
      this.state.errorInput = null;
    }
    */
    this.setState({value: event.target.value});
  },

  _handlerBlurValue(){

  },

  render(){
    const {placeholder} = this.props;
    return (
      <div style={styles.rootDiv}>
        <input
           ref="input"
           autocomplete="off"
           type="password"
           style={styles.inputText}
           translate={false}
           placeholder={placeholder}
           value={this.state.value}
           onChange={this._handlerChangeValue}
           onBlur={this._handlerBlurValue}
        >
        </input>
      </div>
    )
  },

  getValue(){
    return this.state.value;
  }

});

export default InputSecret
