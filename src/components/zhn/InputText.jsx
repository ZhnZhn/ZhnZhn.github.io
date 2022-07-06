//import PropTypes from "prop-types";
import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useImperativeHandle
} from 'react';
import useInputKeyDown from './useInputKeyDown';

import {
  S_INPUT
} from './Input.Style';

const CL_NUMBER_RANGE = 'input-minmax-number';

const S_INPUT_TEXT = {
   ...S_INPUT,
   display: 'inline',
   width: 40,
   paddingLeft: 5,
   marginLeft: 5,
   marginRight: 5,
   height: 26,
   backgroundColor: '#e1e1cb',
   boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
};

const BLANK = ''
, TEXT = 'text'
, OFF = "off";

const _isFn = fn => typeof fn === 'function';
const _isNumber = n => typeof n === 'number';

const _initValue = initialValue => initialValue != null
  ? initialValue
  : BLANK

const _isMinMaxNumber = ({
  type,
  min,
  max
}) => type === 'number'
 && _isNumber(min)
 && _isNumber(max);

const InputText = forwardRef((props, ref) => {
  const {
    initValue,
    style,
    type,
    spellCheck,
    placeholder,
    maxLength=125,
    min,
    max,
    step,
    onChange,
    onEnter
  } = props
  , [value, setValue] = useState(() => _initValue(initValue))
  , _refInput = useRef()
  , _hChange = (event) => {
      const _value = event.target.value;
      if (_value.length <= maxLength) {
        setValue(_value)
        if (_isFn(onChange)) {
          onChange(_value)
        }
      }
    }
  , _hKeyDown = useInputKeyDown({
      onEnter,
      onDelete: () => setValue(BLANK)
  }, [onEnter]);


  useEffect(() => setValue(_initValue(initValue))
   ,[initValue]
  )

  useImperativeHandle(ref, () => ({
    getValue: () => (''+value).trim(),
    setValue: setValue,
    focus: () => _refInput.current.focus()
  }), [value])

  const  [
    _autoCorrect,
    _spellCheck
  ] = spellCheck
    ? ["on", "true"]
    : ["off", "false"]
  , _className = _isMinMaxNumber(props)
       ? CL_NUMBER_RANGE
       : void 0;
  return (
    <input
      ref={_refInput}
      className={_className}
      style={{...S_INPUT_TEXT, ...style}}
      type={type || TEXT}
      name={TEXT}
      autoCapitalize={OFF}
      autoComplete={OFF}
      autoCorrect={_autoCorrect}
      spellCheck={_spellCheck}
      translate="false"
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      min={min}
      max={max}
      step={step}
      onChange={_hChange}
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
   spellCheck: PropTypes.bool,
   maxLength: PropTypes.number,
   min: PropTypes.number,
   max: PropTypes.number,
   step: PropTypes.number,
   onEnter: PropTypes.func,
   onChange: PropTypes.func
 }
 */

export default InputText
