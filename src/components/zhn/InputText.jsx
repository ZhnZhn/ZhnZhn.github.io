import React, { useState, useRef, useEffect, useImperativeHandle } from 'react';
//import PropTypes from "prop-types";

const CL = {
  NUMBER_RANGE: 'input-minmax-number'
};

const S = {
  INPUT: {
    display: 'inline',
    background: 'transparent none repeat scroll 0 0',
    border: 'medium none',
    outline: 'medium none',
    height: 26,
    paddingLeft: 5,
    color: 'green',
    width: 40,
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#e1e1cb',
    marginLeft: 5,
    marginRight: 5,
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  }
};

const C = {
  BLANK: '',
  TEXT: 'text'
};

const _isFn = fn => typeof fn === 'function';
const _isNumber = n => typeof n === 'number';

const _initValue = initialValue => initialValue != null
  ? initialValue : C.BLANK

const _isMinMaxNumber = ({ type, min, max }) => type === 'number'
 && _isNumber(min)
 && _isNumber(max);

const InputText = React.forwardRef((props, ref) => {
  const {
    initValue,
    style, type,
    spellCheck, placeholder,
    maxLength=125,
    min, max, step,
    onInputChange, onEnter
  } = props
  , [value, setValue] = useState(() => _initValue(initValue))
  , _refInput = useRef()
  , _hInputChange = (event) => {
      const value = event.target.value
      if (value.length <= maxLength) {
        setValue(value)
        if (_isFn(onInputChange)) {
          onInputChange(value)
        }
      }
    }
  , _hKeyDown = (event) => {
      switch(event.keyCode){
        case 27: case 46:
           event.preventDefault()
           setValue(C.BLANK)
           break;
        case 13:
           if (_isFn(onEnter)) {
             onEnter(event.target.value)
           }
           break;
        default: return;
      }
  };

  useEffect(() =>
     setValue(_initValue(initValue))
  , [initValue])

  useImperativeHandle(ref, () => ({
    getValue: () => (''+value).trim(),
    setValue: setValue,
    focus: () => _refInput.current.focus()
  }), [value])

  const  _autoCorrect = spellCheck
     ? "on"
     : "off"
  , _spellCheck = spellCheck
       ? "true"
       : "false"
  , _className = _isMinMaxNumber(props)
       ? CL.NUMBER_RANGE
       : void 0;
  return (
    <input
      ref={_refInput}
      className={_className}
      style={{ ...S.INPUT, ...style }}
      type={type || C.TEXT}
      name={C.TEXT}
      autoCapitalize={C.OFF}
      autoComplete={C.OFF}
      autoCorrect={_autoCorrect}
      spellCheck={_spellCheck}
      translate="false"
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      min={min}
      max={max}
      step={step}
      onChange={_hInputChange}
      onKeyDown={_hKeyDown}
    />
  );
})

/*
 InputText.propTypes = {
   style: PropTypes.object,
   initValue: PropTypes.string,
   type: PropTypes.string,
   placeholder: PropTypes.string,
   min: PropTypes.number,
   max: PropTypes.number,
   step: PropTypes.number,
   onEnter: PropTypes.func
 }
 */

export default InputText
