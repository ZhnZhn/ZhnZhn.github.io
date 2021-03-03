import {useRef, useCallback} from 'react'

const useInputText = (setValidationMessages) => {
  const ref = useRef()
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hClear = useCallback(() => {
    const { current } = ref;
    if (current) {
      current.setValue('')
      setValidationMessages([])
    }
  }, []);
  //setValidationMessages
  /*eslint-enable react-hooks/exhaustive-deps */
  return [ref, _hClear];
};

export default useInputText
