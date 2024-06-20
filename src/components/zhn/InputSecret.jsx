import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useImperativeHandle,
  stopImmediatePropagation
} from '../uiApi';

import { S_BORDER_RADIUS_2 } from '../styleFn';

import useInputKeyDown from './useInputKeyDown';

const S_DIV = {
  ...S_BORDER_RADIUS_2,
  display: 'inline-block',
  width: 275,
  backgroundColor: '#e1e1cb',
}, S_INPUT = {
  color: 'green',
  width: '100%',
  height: 30,
  paddingLeft: 10,
  background: 'transparent none repeat scroll 0 0',
  border: 'medium none',
  outline: 'medium none',
  fontSize: '16px',
  fontWeight: 'bold'
};

const _onEnter = () => {}

const InputSecret = ({
  refEl,
  name,
  placeholder,
  maxLength="32",
  onEnter=_onEnter
}) => {
  const _refInput = useRef()
  , _refEnter = useRef(() => '')
  , [
    value,
    setValue
  ] = useState('')
  , _hInputChange = useCallback(evt => {
    stopImmediatePropagation(evt)
    setValue(evt.target.value.trim())
  }, [])
  , _hKeyDown = useInputKeyDown({
    onEnter: () => _refEnter.current(),
    onDelete: () => {
      onEnter('')
      setValue('')
    }
  }, [onEnter]);

  _refEnter.current = () => onEnter(value)

  useImperativeHandle(refEl, () => ({
    getValue: () => value,
    clear: () => setValue('')
  }), [value])

  useEffect(() => {
    setTimeout(() => {
      const _input = _refInput.current;
      if (_input && _input.hasAttribute('value')) {
        _input.removeAttribute('value')
      }
    })
  })

  return (
    <div style={S_DIV}>
      <input
         hidden={true}
         autoComplete="username"
         value={name}
         readOnly={true}
      />
      <input
         ref={_refInput}
         style={S_INPUT}
         type="password"
         autoComplete="current-password"
         placeholder={placeholder}
         maxLength={maxLength}
         value={value}
         onChange={_hInputChange}
         onKeyDown={_hKeyDown}
      />
    </div>
  );
};

export default InputSecret
