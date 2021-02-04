"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _useLoadOptions2 = _interopRequireDefault(require("./hooks/useLoadOptions"));

var _RowInputSelect = _interopRequireDefault(require("./rows/RowInputSelect"));

var SelectWithLoad = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _ref$isShow = _ref.isShow,
      isShow = _ref$isShow === void 0 ? true : _ref$isShow,
      _ref$optionNames = _ref.optionNames,
      optionNames = _ref$optionNames === void 0 ? 'Items' : _ref$optionNames,
      _ref$jsonProp = _ref.jsonProp,
      jsonProp = _ref$jsonProp === void 0 ? 'items' : _ref$jsonProp,
      uri = _ref.uri,
      restProps = (0, _objectWithoutPropertiesLoose2["default"])(_ref, ["isShow", "optionNames", "jsonProp", "uri"]);

  var _useLoadOptions = (0, _useLoadOptions2["default"])(isShow, uri, jsonProp),
      state = _useLoadOptions[0],
      loadOptions = _useLoadOptions[1],
      options = state.options;

  (0, _react.useImperativeHandle)(ref, function () {
    return {
      getOptions: function getOptions() {
        return options;
      }
    };
  }, [options]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowInputSelect["default"], (0, _extends2["default"])({
    isShow: isShow
  }, restProps, state, {
    onLoadOption: loadOptions
  }));
});
var _default = SelectWithLoad;
exports["default"] = _default;
//# sourceMappingURL=SelectWithLoad.js.map