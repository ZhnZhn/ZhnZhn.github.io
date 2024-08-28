import {
  useRef,
  useCallback,
  isNumber,
  getRefValue,
  setRefValue
} from '../../uiApi';

import { ERR_NETWORK } from '../../../constants/Msg';

const CLIENT_ERR_CAPTION = "Client Error"
, SERVER_ERR_CAPTION = "Server Error"
, INCORECT_JSON_ERR_DESCR = "Incorrect JSON"
, TOO_MANY_REQ_ERR_DESCR = "Too many requests"
, _crErrDescription = (
  status,
  statusText
) => status + ' ' + statusText
, _isNumberInInterval = (
  n,
  minIncluded,
  maxExcluded
) => n >= minIncluded && n < maxExcluded
, _crErrCaption = status => _isNumberInInterval(status, 400, 500)
  ? CLIENT_ERR_CAPTION
  : _isNumberInInterval(status, 500, 600)
     ? SERVER_ERR_CAPTION
     : '';

const MAX_LOAD_ITEMS = 3;
let _numberOfLoadItems = 0;

const useLoadItem = (
  uri,
  setLoading,
  setLoadingFailed,
  onLoadItem
) => {
  /*eslint-disable react-hooks/exhaustive-deps */
  const refLoadId = useRef(null)
  , _refIsItemLoading = useRef(false)
  , loadItem = useCallback(option => {
    if (_numberOfLoadItems >= MAX_LOAD_ITEMS) {
      setLoadingFailed(
        CLIENT_ERR_CAPTION,
        TOO_MANY_REQ_ERR_DESCR
      )
    } else if (!getRefValue(_refIsItemLoading)) {
      _numberOfLoadItems++;
      setRefValue(_refIsItemLoading, true)
      setLoading()
      fetch(uri)
        .then(response => {
           const { status } = response;
           if (_isNumberInInterval(status, 200, 400)){
             return response.json();
           } else {
             setLoadingFailed(
               _crErrCaption(status),
               _crErrDescription(status, response.statusText)
             )
             throw status;
           }
        })
        .then(onLoadItem)
        .catch(error => {
          setRefValue(_refIsItemLoading, false)
          if (error instanceof SyntaxError){
            setLoadingFailed(
              SERVER_ERR_CAPTION,
              INCORECT_JSON_ERR_DESCR
            )
          } else if (!isNumber(error)){
            const _option = option || {}
            , { retryNetwork=0 } = _option;
            if (retryNetwork <= 0){
              const [
                errCaption,
                errDescription
              ] = error instanceof TypeError
                ? [ERR_NETWORK.caption,  ERR_NETWORK.descr]
                : [];
              setLoadingFailed(errCaption, errDescription)
            } else {
              setRefValue(refLoadId, setTimeout(() => loadItem({
                ..._option,
                retryNetwork: retryNetwork - 1
              }), 2E3));
            }
          }
        })
        .finally(() => {
          _numberOfLoadItems--;
        })
      }
  }, []);
  //uri, setLoadingFailed, onLoadItem
  /*eslint-enable react-hooks/exhaustive-deps */
  return [
    loadItem,
    refLoadId
  ];
};

export default useLoadItem
