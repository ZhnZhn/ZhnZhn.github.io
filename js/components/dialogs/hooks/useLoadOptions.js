"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = require("react");

var _Msg = _interopRequireDefault(require("../../../constants/Msg"));

var _ComponentActions = _interopRequireDefault(require("../../../flux/actions/ComponentActions"));

var _crOptions2 = _interopRequireDefault(require("../decorators/crOptions"));

var NETWORK_ERROR = _Msg["default"].Alert.NETWORK_ERROR;

var _showMsgErr = function _showMsgErr(alertCaption, alertDescr) {
  _ComponentActions["default"].showAlert({
    alertCaption: alertCaption,
    alertDescr: alertDescr
  });
};
/*eslint-disable react-hooks/exhaustive-deps */


var _useLoadingFailed = function _useLoadingFailed(setState) {
  return (0, _react.useCallback)(function (errCaption, errDescription) {
    if (errCaption && errDescription) {
      _showMsgErr(errCaption, errDescription);
    }

    setState({
      isLoading: false,
      isLoadingFailed: true
    });
  }, []);
}; //setState

/*eslint-enable react-hooks/exhaustive-deps */


var _useLoad = function _useLoad(refLoadId, setLoadingFailed, setState) {
  /*eslint-disable react-hooks/exhaustive-deps */
  var loadOptions = (0, _react.useCallback)(function (option) {
    var uri = option.uri,
        jsonProp = option.jsonProp,
        _option$retryServer = option.retryServer,
        retryServer = _option$retryServer === void 0 ? 0 : _option$retryServer,
        _option$retryNetwork = option.retryNetwork,
        retryNetwork = _option$retryNetwork === void 0 ? 1 : _option$retryNetwork;
    fetch(uri).then(function (response) {
      var status = response.status,
          statusText = response.statusText;

      if (status >= 200 && status < 400) {
        return response.json();
      } else if (status >= 400 && status < 500) {
        setLoadingFailed('Client Error:', status + ' ' + statusText);
        return null;
      } else if (status >= 500 && status < 600) {
        if (retryServer !== 0) {
          option.retryServer = retryServer - 1;
          refLoadId.current = setTimeout(loadOptions(option), 3E3);
        } else {
          setLoadingFailed('Server Error:', status + ' ' + statusText);
        }

        return null;
      }
    }).then(function (json) {
      if (json) {
        var _crOptions = (0, _crOptions2["default"])(json, jsonProp),
            items = _crOptions.items,
            propCaption = _crOptions.propCaption;

        setState({
          isLoading: false,
          isLoadingFailed: false,
          propCaption: propCaption,
          options: items
        });
      }
    })["catch"](function (error) {
      if (retryNetwork === 0) {
        var _ref = error instanceof TypeError ? [NETWORK_ERROR.caption, NETWORK_ERROR.descr] : [],
            errCaption = _ref[0],
            errDescription = _ref[1];

        setLoadingFailed(errCaption, errDescription);
      } else {
        option.retryNetwork = retryNetwork - 1;
        refLoadId.current = setTimeout(loadOptions(option), 2E3);
      }
    });
  }, []); //refLoadId, setLoadingFailed, setState

  /*eslint-enable react-hooks/exhaustive-deps */

  return loadOptions;
};

var useLoadOptions = function useLoadOptions(isShow, uri, jsonProp) {
  var _useState = (0, _react.useState)({
    options: [],
    isLoading: true,
    isLoadingFailed: false
  }),
      state = _useState[0],
      setState = _useState[1],
      isLoadingFailed = state.isLoadingFailed,
      refLoadId = (0, _react.useRef)(null),
      _setLoadingFailed = _useLoadingFailed(setState),
      _load = _useLoad(refLoadId, _setLoadingFailed, setState),
      loadOptions = (0, _react.useCallback)(function () {
    return _load({
      uri: uri,
      jsonProp: jsonProp
    });
  }, []); //load, uri, jsonProp

  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */


  (0, _react.useEffect)(function () {
    loadOptions();
    return function () {
      var id = refLoadId.current;
      clearTimeout(id);
    };
  }, []);
  /*eslint-enable react-hooks/exhaustive-deps */

  /*eslint-disable react-hooks/exhaustive-deps */

  (0, _react.useEffect)(function () {
    if (isShow && isLoadingFailed) {
      loadOptions();
    }
  }, [isShow, isLoadingFailed]);
  /*eslint-enable react-hooks/exhaustive-deps */

  return [state, loadOptions];
};

var _default = useLoadOptions;
exports["default"] = _default;
//# sourceMappingURL=useLoadOptions.js.map