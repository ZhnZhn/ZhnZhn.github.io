"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _DialogStyles = _interopRequireDefault(require("../../styles/DialogStyles"));

//rowStyle, labelStyle
var crRowStyle = function crRowStyle(_ref, isOc) {
  var isShowLabels = _ref.isShowLabels,
      captionStyle = _ref.captionStyle;
  return isOc ? _DialogStyles["default"].crRowOcSelectStyle(isShowLabels, captionStyle) : _DialogStyles["default"].crRowLabelStyle(isShowLabels, captionStyle);
};

var _default = crRowStyle;
exports["default"] = _default;
//# sourceMappingURL=crRowStyle.js.map