"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _Link = _interopRequireDefault(require("./Link"));

var BASE_URL = 'https://www.lme.com/metals/non-ferrous/';
var LME = 'London Metal Exchange: ';

var LmeLink = function LmeLink(_ref) {
  var _ref$item = _ref.item,
      item = _ref$item === void 0 ? {} : _ref$item;

  var _item$caption = item.caption,
      caption = _item$caption === void 0 ? '' : _item$caption,
      _path = String(caption).toLowerCase().replace(' ', '-');

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link["default"], {
    caption: LME + caption,
    href: BASE_URL + _path
  });
};

var _default = LmeLink;
exports["default"] = _default;
//# sourceMappingURL=LmeLink.js.map