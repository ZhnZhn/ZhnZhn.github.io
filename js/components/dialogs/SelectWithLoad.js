"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useLoadOptions = _interopRequireDefault(require("./hooks/useLoadOptions"));
var _RowInputSelect = _interopRequireDefault(require("./rows/RowInputSelect"));
var _jsxRuntime = require("react/jsx-runtime");
const SelectWithLoad = (0, _uiApi.forwardRef)((_ref, ref) => {
  let {
    isShow = true,
    optionNames = 'Items',
    jsonProp = 'items',
    uri,
    ...restProps
  } = _ref;
  const [state, loadOptions] = (0, _useLoadOptions.default)(isShow, uri, jsonProp),
    {
      options
    } = state;
  (0, _uiApi.useImperativeHandle)(ref, () => ({
    getOptions: () => options
  }), [options]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputSelect.default, {
    isShow: isShow,
    ...restProps,
    ...state,
    onLoadOption: loadOptions
  });
});
var _default = SelectWithLoad;
exports.default = _default;
//# sourceMappingURL=SelectWithLoad.js.map