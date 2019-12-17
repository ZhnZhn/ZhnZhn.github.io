"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var S = {
  CAPTION: {
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
};

var ItemOption = function ItemOption(_ref) {
  var _ref$item = _ref.item,
      item = _ref$item === void 0 ? {} : _ref$item,
      propCaption = _ref.propCaption;
  return _react["default"].createElement("div", {
    style: S.CAPTION
  }, item[propCaption]);
};

var _default = ItemOption;
exports["default"] = _default;
//# sourceMappingURL=ItemOption.js.map