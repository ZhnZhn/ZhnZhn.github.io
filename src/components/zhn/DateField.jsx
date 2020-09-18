import React, { useState, useRef, useEffect, useImperativeHandle } from 'react';
//import PropTypes from "prop-types";

import STYLE from './Input.Style';

const _isFn = fn => typeof fn === 'function';

const _initState = (value) => ({
  value,
  errorInput: null,
  isValid: true
});

const _onTest = () => true

const DateField = React.forwardRef(({
  rootStyle, inputStyle,
  initialValue='',
  placeholder='YYYY-MM-DD',
  inputmode='numeric',
  name='text-date',
  maxLength=10,
  nForecastDate,
  errorMsg=null,
  onTest=_onTest,
  onEnter
}, ref) => {
  const _refInput = useRef(null)
  , [state, setState] = useState(() => _initState(initialValue))
  , { value, errorInput, isValid } = state
  , _hChangeValue = (event) => {
      const value = event.target.value;
      if (!onTest(value, nForecastDate)){
        setState({ value, isValid: false, errorInput: null })
      } else {
        setState(_initState(value))
      }
    }
  , _hBlurValue = () => {
      if (value !== initialValue && !onTest(value, nForecastDate)){
        setState({ value, errorInput: errorMsg, isValid: false })
      } else {
        setState({ value, errorInput: null, isValid: true })
      }
    }
  , _hKeyDown = (event) => {
      switch(event.keyCode){
        case 13:
          if (_isFn(onEnter)) {
            onEnter(event.target.value)
          }
          break;
        case 27: case 46:
          event.preventDefault()
          setState(_initState(initialValue))
          break;
        default: return;
      }
    };

  useEffect(() => setState(_initState(initialValue))
    ,[initialValue]
  )

  useImperativeHandle(ref, () => ({
    getValue: () => value,
    setValue: (value) => {
      if (onTest(value)) {
        setState(_initState(value))
      }
    },
    isValid: () => isValid,
    focus: () => _refInput.current.focus()
  }), [value, isValid, onTest])

  const _styleHr = isValid
      ? STYLE.HR_VALID
      : STYLE.HR_NOT_VALID;
  return (
    <div style={{...STYLE.ROOT, ...rootStyle}}>
      <input
         ref={_refInput}
         style={{...STYLE.INPUT, ...inputStyle}}
         name={name}
         autoComplete="off"
         autoCorrect="off"
         autoCapitalize="off"
         spellCheck={false}
         type="text"
         placeholder={placeholder}
         inputMode={inputmode}
         value={value}
         maxLength={maxLength}
         onChange={_hChangeValue}
         onBlur={_hBlurValue}
         onKeyDown={_hKeyDown}
      />
      <hr style={{...STYLE.HR, ..._styleHr}} />
      <div style={STYLE.ERR_MSG}>
        {errorInput}
      </div>
    </div>
  );
})

/*
 DateField.propTypes = {
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

export default DateField
