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
  },
  inputHr: {
    borderWidth: 'medium medium 1px',
    borderStyle: 'none none solid',
    borderColor: 'red',
    borderImage: 'none',
    margin: 0,
    marginLeft: '10px',
    marginBottom: '5px',
    width: '230px',
  },
  errMsg: {
    color: '#F44336',
    paddingLeft: '10px',
    paddingBottom: '5px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
};


const ZhDateField = React.createClass({
  getInitialState: function(){
      let initValue = this.props.initValue ? this.props.initValue : '';

      return {
        value: initValue,
        errorInput: null,
        isValid: true,
      }
  },

  _handlerChangeValue: function(event){
    this.state.value = event.target.value;
    if (!this.props.onTest(this.state.value)) {
      this.state.isValid = false;
    } else {
      this.state.isValid = true;
      this.state.errorInput = null;
    }
    this.setState(this.state);
  },

  _handlerBlurValue: function(){
    if (!this.props.onTest(this.state.value)) {
      this.state.errorInput = this.props.errorMsg;
      this.state.isValid = false;
    } else {
      this.state.errorInput = null;
      this.state.isValid = true;
    }
    this.setState(this.state);
  },

  render: function(){
    let styleHr = this.state.isValid ? {borderColor: '#1B75BB'} : {borderColor: '#F44336'};

    return (
      <div style={styles.rootDiv}>
        <input
           ref="inputDate"
           type="text"
           style={styles.inputText}
           translate={false}
           placeholder="YYYY-MM-DD"
           value={this.state.value}
           onChange={this._handlerChangeValue}
           onBlur={this._handlerBlurValue}
        >
        </input>
        <hr style={Object.assign({}, styles.inputHr, styleHr)}></hr>
        <div style={styles.errMsg}>
          {this.state.errorInput}
        </div>
      </div>
    );
  },

  getValue: function(){
    return this.state.value;
  },

  isValid: function(){
    return this.state.isValid;
  },

  focusInput: function(){
    this.refs.inputDate.focus();
  },

});

export default ZhDateField;
