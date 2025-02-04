import {
  useRef,
  useCallback,
  useEffect,
  getRefValue,
  setRefValue,
  isRefElementContaintsEvtTarget
} from '../uiApi';

const _removeClickListener = (
  listener,
  ref
) => {
  if (getRefValue(ref)) {
    document.removeEventListener('click', listener, true);
    setRefValue(ref, null)
  }
};

const useClickOutside = (
  isShow,
  onClickOutside
) => {
  const _ref = useRef(null)
  , _refIs = useRef(null)
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hClickOutside = useCallback(evt => {
      //const _el = getRefValue(_ref);
      if (!isRefElementContaintsEvtTarget(_ref, evt)){
        evt.stopPropagation()
        onClickOutside(evt)
      }
  }, [])
  // onClickOutside
  /*eslint-enable react-hooks/exhaustive-deps */

  useEffect(() => {
    if (isShow && !getRefValue(_refIs)) {
      document.addEventListener('click', _hClickOutside, true)
      setRefValue(_refIs, true)
    } else if (!isShow) {
      _removeClickListener(_hClickOutside, _refIs)
    }
  })

  /*eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    return () => _removeClickListener(_hClickOutside, _refIs);
  }, [])
  // _hClickOutside
  /*eslint-enable react-hooks/exhaustive-deps */

  return _ref;
};

export default useClickOutside
