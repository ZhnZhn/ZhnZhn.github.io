import { useRef, useCallback, useEffect } from 'react';

const _removeClickListener = (listener, ref) => {
  if (ref.current) {
   document.removeEventListener('click', listener, true);
   ref.current = null
  }
};

/*eslint-disable react-hooks/exhaustive-deps */
const useClickOutside = (isShow, onClickOutside) => {
  const _ref = useRef(null)
  , _refIs = useRef(null)
  , _hClickOutside = useCallback(event => {
      if ( _ref?.current?.contains
        && !_ref.current.contains(event.target)
      ){
        event.stopPropagation()
        onClickOutside(event)
      }
  }, [])
  // onClickOutside

  useEffect(() => {
    if (isShow && !_refIs.current) {
      document.addEventListener('click', _hClickOutside, true)
      _refIs.current = true
    } else if (!isShow) {
      _removeClickListener(_hClickOutside, _refIs)
    }
  })

  useEffect(() => {
    return () => _removeClickListener(_hClickOutside, _refIs)
  }, [])
  // _hClickOutside

  return _ref;
};
/*eslint-enable react-hooks/exhaustive-deps */

export default useClickOutside
