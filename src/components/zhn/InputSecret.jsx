import React, { useRef, useState, useCallback, useEffect, useImperativeHandle } from 'react';
import useInputKeyDown from './useInputKeyDown'

const S = {
  ROOT: {
    position: 'relative',
    display: 'inline-block',
    width: 275,
    backgroundColor: '#e1e1cb'
  },
  INPUT: {
    color: 'green',
    width: '100%',
    height: 30,
    paddingLeft: 10,
    background: 'transparent none repeat scroll 0 0',
    border: 'medium none',
    outline: 'medium none',
    fontSize: '16px',
    fontWeight: 'bold'
  }
};


const _onEnter = () => {}

const InputSecret = React.forwardRef(({
  name,
  placeholder,
  maxLength="32",
  onEnter=_onEnter
}, ref) => {
  const _refInput = useRef()
  , _refEnter = useRef(() => '')
  , [value, setValue] = useState('')
  , _hInputChange = useCallback(event => {
    setValue(event.target.value.trim())
  }, [])
  , _hKeyDown = useInputKeyDown({
    onEnter: () => _refEnter.current(),
    onDelete: () => {
      onEnter('')
      setValue('')
    }
  }, [onEnter]);

  _refEnter.current = () => onEnter(value)

  useImperativeHandle(ref, () => ({
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
    <div style={S.ROOT}>
      <input
         hidden={true}
         autoComplete="username"
         value={name}
         readOnly={true}
      />
      <input
         ref={_refInput}
         style={S.INPUT}
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
})

export default InputSecret
