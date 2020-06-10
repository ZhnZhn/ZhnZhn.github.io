"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Link = _interopRequireDefault(require("./Link"));

var C = {
  URL: 'https://www.barchart.com/futures/quotes'
};

var BarchartLink = function BarchartLink(_ref) {
  var item = _ref.item,
      style = _ref.style;
  return item ? /*#__PURE__*/_react["default"].createElement(_Link["default"], {
    style: style,
    href: C.URL + "/" + item + "/overview",
    caption: "Barchart " + item
  }) : null;
};

var _default = BarchartLink;
exports["default"] = _default;
//# sourceMappingURL=BarchartLink.js.map