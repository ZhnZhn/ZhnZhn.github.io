import { useContext, useCallback, useEffect } from 'react';
import HotKeysContext from './HotKeysContext';

const _fnNoop = () => void 0

const _focusElementByRef = ref => {
  const _el = (ref || {}).current;
  if (_el && _el.focus) {
    _el.focus()
  }
};

const HotKeysHandler = ({ is }) => {
  const hmHotKeys = useContext(HotKeysContext)
  , _hKeyDown = useCallback((event) => {
     if (event.altKey || event.metaKey) {
       const _handlerConfig = hmHotKeys[event.key]
       if (_handlerConfig) {
          const [ref, onKeyDown=_fnNoop] = _handlerConfig
          _focusElementByRef(ref)
          onKeyDown(event)
       }
     }
  }, [hmHotKeys]);

  useEffect(() => {
    if (is) {
       document.addEventListener('keydown', _hKeyDown, false)
       return () => document.removeEventListener('keydown', _hKeyDown, false)
    }
  }, [is, _hKeyDown])
  return null;
};

export default HotKeysHandler
