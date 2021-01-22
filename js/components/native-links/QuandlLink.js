"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _Link = _interopRequireDefault(require("./Link"));

var C = {
  ROOT_URI: 'https://www.quandl.com/data/',
  CAPTION: 'Quandl Data Link',
  STYLE: {
    color: '#e05927'
  }
};

var QuandlLink = function QuandlLink(_ref) {
  var dbCode = _ref.dbCode,
      dsCode = _ref.dsCode,
      _ref$caption = _ref.caption,
      caption = _ref$caption === void 0 ? C.CAPTION : _ref$caption;

  if (!dbCode || !dsCode) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link["default"], {
    style: C.STYLE,
    href: "" + C.ROOT_URI + dbCode + "/" + dsCode,
    caption: caption + " " + dbCode + "/" + dsCode
  });
};

var _default = QuandlLink;
exports["default"] = _default;
//# sourceMappingURL=QuandlLink.js.map