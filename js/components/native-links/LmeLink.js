"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Link = _interopRequireDefault(require("./Link"));

var BASE_URL = 'https://www.lme.com/metals/non-ferrous/';
var LME = 'London Metal Exchange: ';

var LmeLink = function LmeLink(_ref) {
  var _ref$item = _ref.item,
      item = _ref$item === void 0 ? {} : _ref$item;

  var _item$caption = item.caption,
      caption = _item$caption === void 0 ? '' : _item$caption,
      _path = String(caption).toLowerCase().replace(' ', '-');

  return _react["default"].createElement(_Link["default"], {
    caption: LME + caption,
    href: BASE_URL + _path
  });
};

var _default = LmeLink;
exports["default"] = _default;
//# sourceMappingURL=LmeLink.js.map