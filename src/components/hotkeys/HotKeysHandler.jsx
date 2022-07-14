import {
  useContext,
  useCallback,
  useEffect,
  focusRefElement
} from '../uiApi';

import HotKeysContext from './HotKeysContext';

const FN_NOOP = () => void 0

const HotKeysHandler = ({ 
  is
}) => {
  const hmHotKeys = useContext(HotKeysContext)
  , _hKeyDown = useCallback(event => {
     if (event.altKey || event.metaKey) {
       const _handlerConfig = hmHotKeys[event.key]
       if (_handlerConfig) {
          const [ref, onKeyDown=FN_NOOP] = _handlerConfig
          focusRefElement(ref)
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
