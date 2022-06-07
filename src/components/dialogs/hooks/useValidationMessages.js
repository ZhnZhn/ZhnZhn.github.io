import {
  useState,
  useCallback
} from '../../uiApi';

const useValidationMessages = (
  onClose
) => {
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
  }, [])
  /*eslint-disable react-hooks/exhaustive-deps */
  , hClose = useCallback(() => {
    onClose()
    clearValidationMessages()
  }, []);
  // onClose, clearValidationMessages
  /*eslint-enable react-hooks/exhaustive-deps */

  return [
    validationMessages,
    setValidationMessages,
    clearValidationMessages,
    hClose
  ];
}

export default useValidationMessages
