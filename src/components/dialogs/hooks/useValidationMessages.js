import {
  useState,
  useCallback
} from '../../uiApi';

const _isArr = Array.isArray;

const useValidationMessages = (
  onClose
) => {
  const [
    validationMessages,
    setValidationMessages
  ] = useState([])
  , _setValidationMessages = useCallback(nextMsgs => {
    if (_isArr(nextMsgs)) {
      setValidationMessages(
        prevMsgs => prevMsgs.length === 0 && nextMsgs.length === 0
           ? prevMsgs
           : nextMsgs
      )
    }
  }, [])
  /*eslint-disable react-hooks/exhaustive-deps */
  , hClose = useCallback(() => {
      onClose()
      _setValidationMessages([])
  }, []);
  // onClose, _setValidationMessages
  /*eslint-enable react-hooks/exhaustive-deps */

  return [
    validationMessages,
    _setValidationMessages,
    hClose
  ];
}

export default useValidationMessages
