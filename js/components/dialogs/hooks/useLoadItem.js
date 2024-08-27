"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _Msg = require("../../../constants/Msg");
const CLIENT_ERR_CAPTION = "Client Error",
  SERVER_ERR_CAPTION = "Server Error",
  INCORECT_JSON_ERR_DESCR = "Incorrect JSON",
  _crErrDescription = (status, statusText) => status + ' ' + statusText,
  _isNumberInInterval = (n, minIncluded, maxExcluded) => n >= minIncluded && n < maxExcluded,
  _crErrCaption = status => _isNumberInInterval(status, 400, 500) ? CLIENT_ERR_CAPTION : _isNumberInInterval(status, 500, 600) ? SERVER_ERR_CAPTION : '';
const useLoadItem = (uri, setLoading, setLoadingFailed, onLoadItem) => {
  /*eslint-disable react-hooks/exhaustive-deps */
  const refLoadId = (0, _uiApi.useRef)(null),
    _refIsItemLoading = (0, _uiApi.useRef)(false),
    loadItem = (0, _uiApi.useCallback)(option => {
      if (!(0, _uiApi.getRefValue)(_refIsItemLoading)) {
        (0, _uiApi.setRefValue)(_refIsItemLoading, true);
        setLoading();
        fetch(uri).then(response => {
          const {
            status
          } = response;
          if (_isNumberInInterval(status, 200, 400)) {
            return response.json();
          } else {
            setLoadingFailed(_crErrCaption(status), _crErrDescription(status, response.statusText));
            throw status;
          }
        }).then(onLoadItem).catch(error => {
          (0, _uiApi.setRefValue)(_refIsItemLoading, false);
          if (error instanceof SyntaxError) {
            setLoadingFailed(SERVER_ERR_CAPTION, INCORECT_JSON_ERR_DESCR);
          } else if (!(0, _uiApi.isNumber)(error)) {
            const _option = option || {},
              {
                retryNetwork = 0
              } = _option;
            if (retryNetwork <= 0) {
              const [errCaption, errDescription] = error instanceof TypeError ? [_Msg.ERR_NETWORK.caption, _Msg.ERR_NETWORK.descr] : [];
              setLoadingFailed(errCaption, errDescription);
            } else {
              (0, _uiApi.setRefValue)(refLoadId, setTimeout(() => loadItem({
                ..._option,
                retryNetwork: retryNetwork - 1
              }), 2E3));
            }
          }
        });
      }
    }, []);
  //uri, setLoadingFailed, onLoadItem
  /*eslint-enable react-hooks/exhaustive-deps */
  return [loadItem, refLoadId];
};
var _default = exports.default = useLoadItem;
//# sourceMappingURL=useLoadItem.js.map