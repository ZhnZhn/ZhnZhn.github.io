"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Link = _interopRequireDefault(require("./Link"));

var C = {
  BASE: 'http://www.fao.org/faostat/en/#data/'
};

var FaoStatLink = function FaoStatLink(_ref) {
  var item = _ref.item;
  return _react["default"].createElement(_Link["default"], {
    href: item ? C.BASE + item : C.BASE,
    caption: "FAOSTAT Link"
  });
};

var _default = FaoStatLink;
exports["default"] = _default;
//# sourceMappingURL=FaoStatLink.js.map