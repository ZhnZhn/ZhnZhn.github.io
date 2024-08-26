"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _useHasNotEqual = _interopRequireDefault(require("../../hooks/useHasNotEqual"));
var _Msg = require("../../../constants/Msg");
var _ComponentActions = require("../../../flux/actions/ComponentActions");
var _crOptions = _interopRequireDefault(require("./crOptions"));
const _showMsgErr = (alertCaption, alertDescr) => {
  (0, _ComponentActions.showAlert)({
    alertCaption,
    alertDescr
  });
};

/*eslint-disable react-hooks/exhaustive-deps */
const _useLoadingFailed = setState => (0, _uiApi.useCallback)((errCaption, errDescription) => {
  if (errCaption && errDescription) {
    _showMsgErr(errCaption, errDescription);
  }
  setState({
    isLoading: false,
    isLoadingFailed: true
  });
}, []);
//setState
/*eslint-enable react-hooks/exhaustive-deps */

const _useLoad = (refLoadId, setLoadingFailed, setState) => {
  /*eslint-disable react-hooks/exhaustive-deps */
  const loadOptions = (0, _uiApi.useCallback)(option => {
    const {
      uri,
      jsonProp,
      retryServer = 0,
      retryNetwork = 1
    } = option;
    fetch(uri).then(response => {
      const {
        status,
        statusText
      } = response;
      if (status >= 200 && status < 400) {
        return response.json();
      } else if (status >= 400 && status < 500) {
        setLoadingFailed('Client Error:', status + ' ' + statusText);
      } else if (status >= 500 && status < 600) {
        if (retryServer !== 0) {
          option.retryServer = retryServer - 1;
          //refLoadId.current = setTimeout(() => loadOptions(option), 3E3)
        } else {
          setLoadingFailed('Server Error:', status + ' ' + statusText);
        }
      }
    }).then(json => {
      if (json) {
        const [items, propCaption] = (0, _crOptions.default)(json, jsonProp);
        setState({
          isLoading: false,
          isLoadingFailed: false,
          propCaption,
          options: items
        });
      }
    }).catch(error => {
      if (retryNetwork === 0) {
        const [errCaption, errDescription] = error instanceof TypeError ? [_Msg.ERR_NETWORK.caption, _Msg.ERR_NETWORK.descr] : [];
        setLoadingFailed(errCaption, errDescription);
      } else {
        option.retryNetwork = retryNetwork - 1;
        refLoadId.current = setTimeout(() => loadOptions(option), 2E3);
      }
    });
  }, []);
  //refLoadId, setLoadingFailed, setState
  /*eslint-enable react-hooks/exhaustive-deps */
  return loadOptions;
};
const _useIsReload = (isShow, isLoadingFailed) => {
  const [_hasToggled] = (0, _useHasNotEqual.default)(isShow);
  return isShow && isLoadingFailed && _hasToggled;
};
const useLoadOptions = (isShow, uri, jsonProp) => {
  const [state, setState] = (0, _uiApi.useState)({
      options: [],
      isLoading: true,
      isLoadingFailed: false
    }),
    {
      isLoadingFailed
    } = state,
    refLoadId = (0, _uiApi.useRef)(null),
    _isReloadFailedOption = _useIsReload(isShow, isLoadingFailed),
    _setLoadingFailed = _useLoadingFailed(setState),
    _load = _useLoad(refLoadId, _setLoadingFailed, setState)
    /*eslint-disable react-hooks/exhaustive-deps */,
    loadOptions = (0, _uiApi.useCallback)(() => _load({
      uri,
      jsonProp
    }), []);
  //load, uri, jsonProp
  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    loadOptions();
    return () => {
      const {
        current: id
      } = refLoadId;
      clearTimeout(id);
    };
  }, []);
  // loadOptions
  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    if (_isReloadFailedOption) {
      loadOptions();
    }
  }, [_isReloadFailedOption]);
  // loadOptions
  /*eslint-enable react-hooks/exhaustive-deps */

  return [state, loadOptions];
};
var _default = exports.default = useLoadOptions;
//# sourceMappingURL=useLoadOptions.js.map