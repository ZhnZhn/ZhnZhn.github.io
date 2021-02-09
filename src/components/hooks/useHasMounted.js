import { useRef } from 'react'

const useHasMounted = () => {
  const _ref = useRef(true)
  , { current } = _ref
  _ref.current = false
  return current;
};

export default useHasMounted
