import {
  useRef,
  useCallback,
  setRefValue
} from '../uiApi';

const useRefFocus = () => {
 const refFocusElement = useRef()
 , setRefFocusElement = useCallback(el => {
     setRefValue(refFocusElement, el)
 }, []);
 return [
   refFocusElement,
   setRefFocusElement
 ];
}

export default useRefFocus
