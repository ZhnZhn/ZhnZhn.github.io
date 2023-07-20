import {
  useRef,
  useCallback,
  getRefValue
} from '../../uiApi';

const useInputText = (setValidationMessages) => {
  const refInput = useRef()
  /*eslint-disable react-hooks/exhaustive-deps */
  , _hClear = useCallback(() => {
    const _inputInst = getRefValue(refInput);
    if (_inputInst) {
      _inputInst.setValue('')
      setValidationMessages([])
    }
  }, []);
  //setValidationMessages
  /*eslint-enable react-hooks/exhaustive-deps */
  return [refInput, _hClear];
};

export default useInputText
