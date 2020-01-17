import React, { Component } from 'react';
//import PropTypes from "prop-types";

import STYLE from './InputStyle';

const _isFn = fn => typeof fn === 'function';

const _crInitialState = ({ initialValue }) => ({
  initialValue,
  ..._crValueState(initialValue)
});

const _crValueState = (value='') => ({
  value,
  errorInput: null,
  isValid: true
});

class DateField extends Component {
  /*
   static propTypes = {
     rootStyle: PropTypes.object,
     inputStyle: PropTypes.object,
     initialValue: PropTypes.string,
     placeholder: PropTypes.string,
     inpumode: PropTypes.string,
     maxLength: PropTypes.number,
     errorMsg: PropTypes.string,
     nForecastDate: PropTypes.number,
     onTest: PropTypes.func,
     onEnter: PropTypes.func
   }
   */

   static defaultProps = {
     initialValue: '',
     placeholder: 'YYYY-MM-DD',
     inputmode: 'numeric',
     name: 'text-date',
     maxLength: 10,
     onTest: () => true
   }

   constructor(props){
     super(props)
     this.isOnEnter = _isFn(props.onEnter)
     this.state = _crInitialState(props)
   }

   static getDerivedStateFromProps(nextProps, prevState){
     return nextProps.initialValue !== prevState.initialValue
       ? _crInitialState(nextProps)
       : null;
   }

  _handleChangeValue = (event) => {
    const { onTest, nForecastDate } = this.props
         , value = event.target.value;
    if (!onTest(value, nForecastDate)){
      this.setState({
         value: value,
         isValid: false
      })
    } else {
      this.setState(_crValueState(value))
    }
  }

  _handleBlurValue = () => {
    const {
      initialValue,
      onTest, nForecastDate, errorMsg
    } = this.props
    , { value } = this.state;
    if (value !== initialValue && !onTest(value, nForecastDate)){
      this.setState({
        errorInput: errorMsg,
        isValid: false
      })
    } else {
      this.setState({
        errorInput: null,
        isValid: true
      })
    }
  }

  _handleKeyDown = (event) => {
    switch(event.keyCode){
      case 13:
        if (this.isOnEnter) {
          this.props.onEnter(event.target.value)
        }
        break;
      case 27: case 46:
        event.preventDefault()
        this.setState(
          _crValueState(this.props.initialValue)
        )
        break;
      default: return;
    }
  }

  _refDate = node => this.inputDate = node

  render(){
    const {
            rootStyle, inputStyle,
            placeholder,
            inputmode,
            name,
            maxLength
          } = this.props
        , { value, errorInput, isValid } = this.state
        , _styleHr = isValid
            ? STYLE.HR_VALID
            : STYLE.HR_NOT_VALID;
    return (
      <div style={{...STYLE.ROOT, ...rootStyle}}>
        <input
           ref={this._refDate}
           style={{...STYLE.INPUT, ...inputStyle}}
           name={name}
           //autoComplete="new-text-date"
           autoComplete="off"
           autoCorrect="off"
           autoCapitalize="off"
           spellCheck={false}
           type="text"
           placeholder={placeholder}
           inputMode={inputmode}
           value={value}
           maxLength={maxLength}
           onChange={this._handleChangeValue}
           onBlur={this._handleBlurValue}
           onKeyDown={this._handleKeyDown}
        />
        <hr style={{...STYLE.HR, ..._styleHr}} />
        <div style={STYLE.ERR_MSG}>
          {errorInput}
        </div>
      </div>
    );
  }

  getValue = () => {
    return this.state.value;
  }
  setValue(value) {
    if (this.props.onTest(value)) {
      this.setState(_crValueState(value))
    }
  }
  isValid = () => {
    return this.state.isValid;
  }
  focusInput = () => {
    this.inputDate.focus();
  }
}

export default DateField
