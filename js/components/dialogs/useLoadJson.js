"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.useLoadJson = void 0;
var _fnFetch = require("../../utils/fnFetch");
var _uiApi = require("../uiApi");
var _useHasNotEqual = _interopRequireDefault(require("../hooks/useHasNotEqual"));
const _crState = (isLoading, isLoadFailed, errMsg, json) => ({
  isLoading,
  isLoadFailed,
  errMsg,
  json
});
const useLoadJson = (initialJson, isLoadJson, jsonUrl) => {
  const [{
      isLoading,
      isLoadFailed,
      errMsg,
      json
    }, setState] = (0, _uiApi.useState)(() => _crState(!1, !1, '', initialJson)),
    isCurrentJsonUrl = (0, _useHasNotEqual.default)(jsonUrl)[1];
  (0, _uiApi.useEffect)(() => {
    if (isLoadJson && jsonUrl) {
      setState(prevState => ({
        ...prevState,
        isLoading: !0
      }));
      (0, _fnFetch.fetchJson)({
        uri: jsonUrl,
        onFetch: function (_temp) {
          let {
            json
          } = _temp === void 0 ? {} : _temp;
          return isCurrentJsonUrl(jsonUrl) && setState(_crState(!1, !1, '', json));
        },
        onCatch: function (_temp2) {
          let {
            error
          } = _temp2 === void 0 ? {} : _temp2;
          return isCurrentJsonUrl(jsonUrl) && setState(_crState(!1, !0, error.message));
        }
      });
    }
  }, [isLoadJson, jsonUrl, isCurrentJsonUrl]);
  return [isLoading, isLoadFailed, errMsg, json];
};
exports.useLoadJson = useLoadJson;
//# sourceMappingURL=useLoadJson.js.map