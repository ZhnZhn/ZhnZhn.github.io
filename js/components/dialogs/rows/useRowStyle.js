"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _DialogStyles = _interopRequireDefault(require("../../styles/DialogStyles"));

var useRowStyle = function useRowStyle(_ref, isOc) {
  var isShowLabels = _ref.isShowLabels,
      captionStyle = _ref.captionStyle;

  var _style = isOc ? _DialogStyles["default"].crRowOcSelectStyle(isShowLabels, captionStyle) : _DialogStyles["default"].crRowLabelStyle(isShowLabels, captionStyle);

  return (0, _extends2["default"])({}, _style);
};

var _default = useRowStyle;
exports["default"] = _default;
//# sourceMappingURL=useRowStyle.js.map