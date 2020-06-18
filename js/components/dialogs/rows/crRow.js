"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _crRowStyle = _interopRequireDefault(require("./crRowStyle"));

var _crRowCaption = _interopRequireDefault(require("./crRowCaption"));

var crRow = function crRow(_ref, isOc) {
  var isShowLabels = _ref.isShowLabels,
      caption = _ref.caption,
      captionStyle = _ref.captionStyle;
  return (0, _extends2["default"])({}, (0, _crRowStyle["default"])({
    isShowLabels: isShowLabels,
    captionStyle: captionStyle
  }, isOc), (0, _crRowCaption["default"])(caption));
};

var _default = crRow;
exports["default"] = _default;
//# sourceMappingURL=crRow.js.map