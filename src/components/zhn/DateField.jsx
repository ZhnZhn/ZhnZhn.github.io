//import PropTypes from "prop-types";
import {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  focusRefElement
} from '../uiApi';
import {
  crInputProps
} from '../inputFn';

import useInputKeyDown from './useInputKeyDown';

import Hr from './Hr';
import ErrMsg from './ErrMsg';

import {
  S_ROW,
  S_INPUT
} from './Input.Style';

const _crState = (
  value,
  errorInput,
  isValid
) => [
  value,
  errorInput,
  isValid
]
, _initState = (
  value
) => _crState(value, null, true)
, DF_ON_TEST = () => true;

const DateField = ({
  refEl,
  style,
  inputStyle,
  initialValue='',
  placeholder='YYYY-MM-DD',
  inputMode='numeric',
  name='text-date',
  maxLength=10,
  errorMsg=null,
  onTest=DF_ON_TEST,
  onEnter
}) => {
  const _refInput = useRef(null)
  , [
    state,
    setState
  ] = useState(() => _initState(initialValue))
  , [
    value,
    errorInput,
    isValid
  ] = state
  , _hChangeValue = (evt) => {
      const { value } = evt.target;
      setState(onTest(value)
        ? _initState(value)
        : _crState(value, null, false)
      )
    }
  , _hBlurValue = () => {
      setState(value !== initialValue && !onTest(value)
        ? _crState(value, errorMsg, false)
        : _crState(value, null, true)
      )
    }
  , _hKeyDown = useInputKeyDown({
      onEnter,
      onDelete: () => setState(_initState(initialValue))
  }, [initialValue, onEnter]);

  useEffect(
    () => setState(_initState(initialValue)),
    [initialValue]
  )

  useImperativeHandle(refEl, () => ({
    getValue: () => value,
    setValue: (value) => {
      if (onTest(value)) {
        setState(_initState(value))
      }
    },
    isValid: () => isValid,
    focus: () => focusRefElement(_refInput)
  }), [value, isValid, onTest])

  return (
    <div style={{...S_ROW, ...style}}>
      <input
         {...crInputProps()}
         ref={_refInput}
         style={{...S_INPUT, ...inputStyle}}
         name={name}
         placeholder={placeholder}
         inputMode={inputMode}
         value={value}
         maxLength={maxLength}
         onChange={_hChangeValue}
         onBlur={_hBlurValue}
         onKeyDown={_hKeyDown}
      />
      <Hr isValid={isValid} />
      <ErrMsg msg={errorInput} />
    </div>
  );
}

/*
 DateField.propTypes = {
   refEl: PropTypes.ref,
   style: PropTypes.object,
   inputStyle: PropTypes.object,
   initialValue: PropTypes.string,
   placeholder: PropTypes.string,
   inpumode: PropTypes.string,
   maxLength: PropTypes.number,
   errorMsg: PropTypes.string,
   onTest: PropTypes.func,
   onEnter: PropTypes.func
 }
*/

export default DateField
