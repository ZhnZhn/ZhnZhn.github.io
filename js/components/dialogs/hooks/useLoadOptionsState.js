"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _ComponentActions = require("../../../flux/actions/ComponentActions");
var _crOptions = _interopRequireDefault(require("./crOptions"));
const _crInitialState = () => ({
  isLoading: false,
  isLoadingFailed: false
});
const useLoadOptionsState = jsonProp => {
  const [state, setState] = (0, _uiApi.useState)(_crInitialState),
    setLoading = (0, _uiApi.useCallback)(() => {
      setState({
        isLoading: true,
        isLoadingFailed: false
      });
    }, []),
    setLoadingFailed = (0, _uiApi.useCallback)((errCaption, errDescription) => {
      if (errCaption || errDescription) {
        (0, _ComponentActions.showAlert)({
          alertCaption: errCaption,
          alertDescr: errDescription
        });
      }
      setState({
        isLoading: false,
        isLoadingFailed: true
      });
    }, [])
    /*eslint-disable react-hooks/exhaustive-deps */,
    onLoadOptions = (0, _uiApi.useCallback)(json => {
      const [options, propCaption] = (0, _crOptions.default)(json || {}, jsonProp);
      setState({
        ..._crInitialState(),
        propCaption,
        options
      });
    }, []);
  // jsonProp
  /*eslint-enable react-hooks/exhaustive-deps */
  return [state, setLoading, setLoadingFailed, onLoadOptions];
};
var _default = exports.default = useLoadOptionsState;
//# sourceMappingURL=useLoadOptionsState.js.map