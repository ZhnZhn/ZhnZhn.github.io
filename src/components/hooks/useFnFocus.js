import { 
  useRef,
  useEffect,
  useCallback,
  focusRefElement
} from '../uiApi';

/*eslint-disable react-hooks/exhaustive-deps */
const useFnFocus = (fn) => {
  const _ref = useRef(null)
  useEffect(() => { return () => _ref.current = null }, [])
  return [
    _ref,
    useCallback(() => {
      fn()
      focusRefElement(_ref)
    }, [])
  ]
}
/*eslint-enable react-hooks/exhaustive-deps */

export default useFnFocus
