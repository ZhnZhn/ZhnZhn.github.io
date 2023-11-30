import {
  useRef,
  useState,
  useCallback,
  clearInputValue
} from '../../uiApi';

const useValidationMessages = () => {
  const refInput = useRef()
  , [
    validationMessages,
    setValidationMessages
  ] = useState([])
  , clearInput = useCallback(() => {
    clearInputValue(refInput)
    setValidationMessages([])
  }, []);

  return [
    validationMessages,
    setValidationMessages,
    clearInput,
    refInput
  ];
};

export default useValidationMessages
