//import PropTypes from "prop-types";
import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useImperativeHandle
} from 'react';
import useInputKeyDown from './useInputKeyDown'

import Hr from './Hr';
import ErrMsg from './ErrMsg';

import {
  S_ROW,
  S_INPUT
} from './Input.Style';

const _initState = (value) => ({
  value,
  errorInput: null,
  isValid: true
});

const DF_ON_TEST = () => true

const DateField = forwardRef(({
  style, inputStyle,
  initialValue='',
  placeholder='YYYY-MM-DD',
  inputmode='numeric',
  name='text-date',
  maxLength=10,
  errorMsg=null,
  onTest=DF_ON_TEST,
  onEnter
}, ref) => {
  const _refInput = useRef(null)
  , [state, setState] = useState(() => _initState(initialValue))
  , { value, errorInput, isValid } = state
  , _hChangeValue = (event) => {
      const value = event.target.value;
      if (!onTest(value)){
        setState({ value, isValid: false, errorInput: null })
      } else {
        setState(_initState(value))
      }
    }
  , _hBlurValue = () => {
      if (value !== initialValue && !onTest(value)){
        setState({ value, errorInput: errorMsg, isValid: false })
      } else {
        setState({ value, errorInput: null, isValid: true })
      }
    }
  , _hKeyDown = useInputKeyDown({
      onEnter,
      onDelete: () => setState(_initState(initialValue))
  }, [initialValue]);

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

  return (
    <div style={{...S_ROW, ...style}}>
      <input
         ref={_refInput}
         style={{...S_INPUT, ...inputStyle}}
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
      <Hr isValid={isValid} />
      <ErrMsg msg={errorInput} />
    </div>
  );
})

/*
 DateField.propTypes = {
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
