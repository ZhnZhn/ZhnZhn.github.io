import {
  useState,
  useCallback
} from '../../uiApi';

const useValidationMessages = () => {
  const [
    validationMessages,
    setValidationMessages
  ] = useState([])
  , clearValidationMessages = useCallback(() => {
    setValidationMessages(prevMsgs =>
       prevMsgs.length === 0
         ? prevMsgs
         : []
     )
  }, []);

  return [
    validationMessages,
    setValidationMessages,
    clearValidationMessages
  ];
}

export default useValidationMessages
