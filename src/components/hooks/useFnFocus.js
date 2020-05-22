import { useRef, useEffect, useCallback } from 'react'

const _isFn = fn => typeof fn === 'function';

/*eslint-disable react-hooks/exhaustive-deps */
const useFnFocus = (fn) => {
  const _ref = useRef(null)
  useEffect(() => { return () => _ref.current = null }, [])
  return [
    _ref,
    useCallback(() => {
      fn()
      const { current } = _ref;
      if (current && _isFn(current.focus)) {
        current.focus()
      }
    }, [])
  ]
}
/*eslint-enable react-hooks/exhaustive-deps */

export default useFnFocus
