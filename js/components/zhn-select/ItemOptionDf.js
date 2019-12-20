"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var ItemOptionDf = function ItemOptionDf(_ref) {
  var item = _ref.item,
      propCaption = _ref.propCaption;
  return _react["default"].createElement("span", null, item[propCaption]);
};

var _default = ItemOptionDf;
exports["default"] = _default;
//# sourceMappingURL=ItemOptionDf.js.map