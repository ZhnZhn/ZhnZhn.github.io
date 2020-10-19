import { forwardRef, useState, useRef, useCallback, useEffect, useImperativeHandle } from 'react';

import useInputKeyDown from './useInputKeyDown'
//import PropTypes from "prop-types";

import SvgClear from './SvgClear'

import STYLE from './Input.Style';

const S = {
  INPUT: {
    ...STYLE.INPUT,
    width: 'calc(100% - 50px)',
    paddingLeft: 0,
    marginLeft: 10,
    marginBottom: 5
  },
  INPUT_BORDER: {
    borderBottomStyle: 'solid',
    borderBottomWidth: 1
  },
  BT_CLEAR: {
    float: 'right',
    position: 'relative',
    top: 4,
    right: 7
  }
};

//const _isFn = fn => typeof fn === "function";

const ErrMsg = ({ msg }) => msg
 ? (<div style={STYLE.ERR_MSG}>
     {msg}
   </div>)
 : null;

const _crInitialState = (initValue) => ({
  initValue: initValue,
  value: initValue,
  errorInput: void 0,
  isValid: true
});

/*
const _getInitStateFrom = ({ initValue }) => ({
  initValue: initValue,
  value: initValue || '',
  errorInput: void 0,
  isValid: true
});
*/


const _getIsValidColor = isValid => isValid
 ? '#1b75bb'
 : '#f44336';

const _crInputStyle = (isValid) => ({
  ...S.INPUT_BORDER,
  borderBottomColor: _getIsValidColor(isValid)
});

const _crBtClearStyle = (isValid) => ({
  ...S.BT_CLEAR,
  stroke: _getIsValidColor(isValid)
});


const _onTest = () => true
, _onClear = () => {};

const InputPattern = forwardRef(({
  rootStyle, inputStyle,
  maxLength=64,
  initValue='',
  placeholder='Input Pattern',
  errorMsg,
  onTest=_onTest,
  onEnter,
  onClear=_onClear
}, ref) => {
  const _refInput = useRef()
  , _refGetValue = useRef()
  , _refIsValid = useRef()
  , [state, setState] = useState(() => _crInitialState(initValue))
  , { value, isValid, errorInput } = state
  , _hChangeValue = useCallback(event => {
     const value = event.target.value;
     setState(onTest(value)
       ? { value, isValid: true, errorInput: void 0 }
       : { value, isValid: false }
     )
    }, [onTest])
  , _hKeyDown = useInputKeyDown({
       onEnter,
       onDelete: () => setState(_crInitialState(initValue))
     }, [initValue, onEnter])
  , _hClear = useCallback(()=>{
       onClear()
       _refInput.current.focus()
       setState(_crInitialState(initValue))
    }, [initValue, onClear]);

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (state.initValue !== initValue){
      setState(_crInitialState(initValue))
    }
  }, [initValue])
  /*state.initValue*/
  /*eslint-enable react-hooks/exhaustive-deps */

  _refGetValue.current = () => (value || '').trim()
  _refIsValid.current = () => onTest(value)

  useImperativeHandle(ref, () => ({
    getValue: () => _refGetValue.current(),
    isValid: () =>_refIsValid.current(),
    focus: () => _refInput.current.focus(),
    showErrMsg: () =>
      setState(prevState => ({
        ...prevState,
        isValid: false,
        errorInput: errorMsg
      }))
  }), [errorMsg])

  const _inputStyle = _crInputStyle(isValid)
  , _btClearStyle = _crBtClearStyle(isValid);

  return (
    <div style={{...STYLE.ROOT, ...rootStyle}}>
      <input
         type="text"
         style={{...S.INPUT, ...inputStyle, ..._inputStyle }}
         ref={_refInput}
         name="text-date"
         //autoComplete="new-text-date"
         autoComplete="off"
         autoCorrect="off"
         autoCapitalize="off"
         spellCheck={false}
         placeholder={placeholder}
         value={value}
         maxLength={maxLength}
         onChange={_hChangeValue}
         onKeyDown={_hKeyDown}
      />
      { value || errorInput
          ? <SvgClear
               style={_btClearStyle}
               onClick={_hClear}
            />
          : null
      }
      <ErrMsg msg={errorInput} />
    </div>
  );
})

/*
static propTypes = {
  rootStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  initValue: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  errorMsg: PropTypes.string,
  onTest: PropTypes.func,
  onEnter: PropTypes.func,
  onClear: PropTypes.func
}
*/

export default InputPattern
