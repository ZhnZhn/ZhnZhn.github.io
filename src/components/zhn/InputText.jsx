//import PropTypes from "prop-types";
import {
  isNumber,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  focusRefElement
} from '../uiApi';
import useInputKeyDown from './useInputKeyDown';

import {
  S_INPUT,
  S_BOX_SHADOW
} from './Input.Style';

const CL_NUMBER_RANGE = 'input-minmax-number';

const S_INPUT_TEXT = {
   ...S_INPUT,
   ...S_BOX_SHADOW,
   display: 'inline',
   width: 40,
   paddingLeft: 5,
   marginLeft: 5,
   marginRight: 5,
   height: 26,
   backgroundColor: '#e1e1cb'
};

const BLANK = ''
, TEXT = 'text'
, OFF = "off"
, FN_NOOP = () => {};

const _initValue = initialValue => initialValue != null
  ? initialValue
  : BLANK

const _isMinMaxNumber = (
  type,
  min,
  max
) => type === 'number'
 && isNumber(min)
 && isNumber(max);

const InputText = ({
  refEl,
  initValue,
  style,
  type,
  spellCheck,
  placeholder,
  maxLength=125,
  min,
  max,
  step,
  onChange=FN_NOOP,
  onEnter
}) => {
  const [
    value,
    setValue
  ] = useState(() => _initValue(initValue))
  , _refInput = useRef()
  , _hChange = (event) => {
      const { value } = event.target;
      if (value.length <= maxLength) {
        setValue(value)
        onChange(value)
      }
    }
  , _hKeyDown = useInputKeyDown({
      onEnter,
      onDelete: () => setValue(BLANK)
  }, [onEnter]);


  useEffect(
    () => setValue(_initValue(initValue)),
    [initValue]
  )

  useImperativeHandle(refEl, () => ({
    getValue: () => (''+value).trim(),
    setValue,
    focus: () => focusRefElement(_refInput)
  }), [value])

  const  [
    _autoCorrect,
    _spellCheck
  ] = spellCheck
    ? ["on", "true"]
    : ["off", "false"]
  , _className = _isMinMaxNumber(type, min, max)
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
}

/*
 InputText.propTypes = {
   refEl: PropTypes.ref,
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
