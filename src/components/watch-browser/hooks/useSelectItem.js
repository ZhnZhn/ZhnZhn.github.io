import {useRef, useCallback} from 'react'

const useSelectItem = () => {
  const ref = useRef()
  , _hSelect = useCallback(item => {
    const { caption } = item || {};
    ref.current = caption
  },[])
  return [ref, _hSelect];
}

export default useSelectItem
