"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _useRowStyle = _interopRequireDefault(require("./useRowStyle"));

var _useRowCaption = _interopRequireDefault(require("./useRowCaption"));

var useRow = function useRow(_ref, isOc) {
  var isShowLabels = _ref.isShowLabels,
      caption = _ref.caption,
      captionStyle = _ref.captionStyle;
  return (0, _extends2["default"])({}, (0, _useRowStyle["default"])({
    isShowLabels: isShowLabels,
    captionStyle: captionStyle
  }, isOc), (0, _useRowCaption["default"])(caption));
};

var _default = useRow;
exports["default"] = _default;
//# sourceMappingURL=useRow.js.map