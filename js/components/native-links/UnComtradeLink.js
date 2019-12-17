"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Link = _interopRequireDefault(require("./Link"));

var UnComtradeLink = function UnComtradeLink(_ref) {
  var item = _ref.item;
  return _react["default"].createElement(_Link["default"], {
    href: item,
    caption: "UN Comtrade Link"
  });
};

var _default = UnComtradeLink;
exports["default"] = _default;
//# sourceMappingURL=UnComtradeLink.js.map