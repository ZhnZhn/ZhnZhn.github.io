import React, { Component } from 'react';
//import PropTypes from "prop-types";

import STYLE from './InputStyle';

class InputPattern extends Component {
  /*
   static propTypes = {
     rootStyle: PropTypes.object,
     inputStyle: PropTypes.object,
     initValue: PropTypes.string,
     isUpdateInit: PropTypes.bool,
     placeholder: PropTypes.string,
     errorMsg: PropTypes.string,
     onTest: PropTypes.func,
     onEnter: PropTypes.func
   }
  */
   static defaultProps = {
      onTest: () => { return true; }
   }

   _crInitState = (props) => {
     return {
       value: props.initValue || '',
       errorInput: undefined,
       isValid: true
     };
   }

   constructor(props){
     super();
     this.state = this._crInitState(props);
   }

   componentWillReceiveProps(nextProps) {
     if (this.props !== nextProps && nextProps.isUpdateInit) {
        this.setState(this._crInitState(nextProps))
     }
   }

  _handleChangeValue = (event) => {
    const { onTest } = this.props
         , value = event.target.value
    if (!onTest(value)){
      this.setState({
         value: value,
         isValid: false
      })
    } else {
      this.setState({
         value: value,
         isValid: true,
         errorInput: undefined
      })
    }
  }

  _handleBlurValue = () => {
    const { onTest,  errorMsg } = this.props
        , { value } = this.state;
    if (!onTest(value)){
      this.setState({
        errorInput: errorMsg,
        isValid: false
      })
    } else {
      this.setState({
        errorInput: undefined,
        isValid: true
      })
    }
  }

  _handleKeyDown = (event) => {
    switch(event.keyCode){
      case 13:
        if (typeof this.props.onEnter === 'function') {
          this.props.onEnter(event.target.value)
        }
        break;
      case 27: case 46:
        event.preventDefault()
        this.setState({
          value: this.props.initValue || '' ,
          errorInput: undefined,
          isValid: true
        })
        break;
      default: return;
    }
  }

  _refInput = (input) => this.inputPattern = input

  render(){
    const {
            rootStyle, inputStyle,
            placeholder='Input Pattern'
          } = this.props
        , { value, errorInput, isValid } = this.state
        , _styleHr = isValid
            ? STYLE.HR_VALID
            : STYLE.HR_NOT_VALID;
    return (
      <div style={{...STYLE.ROOT, ...rootStyle}}>
        <input
           type="text"
           style={{...STYLE.INPUT, ...inputStyle}}
           ref={this._refInput}
           name="text-date"
           //autoComplete="new-text-date"
           autoComplete="off"
           autoCorrect="off"
           autoCapitalize="off"
           spellCheck={false}
           placeholder={placeholder}
           value={value}
           onChange={this._handleChangeValue}
           onBlur={this._handleBlurValue}
           onKeyDown={this._handleKeyDown}
        >
        </input>
        <hr style={{ ...STYLE.HR, ..._styleHr}}></hr>
        <div style={STYLE.ERR_MSG}>
          {errorInput}
        </div>
      </div>
    );
  }

  getValue(){
    return String(this.state.value).trim();
  }
  isValid(){
    return this.props.onTest(this.state.value);
  }
  focusInput(){
    this.inputPattern.focus()
  }
}

export default InputPattern
