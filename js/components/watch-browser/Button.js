"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));

var S = {
  BT_ROOT: {
    color: 'rgb(35, 47, 59)'
  }
};

var Clear = function Clear(_ref) {
  var onClick = _ref.onClick;
  return _react["default"].createElement(_FlatButton["default"], {
    rootStyle: S.BT_ROOT,
    caption: "Clear",
    title: "Clear Input",
    onClick: onClick
  });
};

var Close = function Close(_ref2) {
  var onClick = _ref2.onClick;
  return _react["default"].createElement(_FlatButton["default"], {
    rootStyle: S.BT_ROOT,
    caption: "Close",
    title: "Close Dialog",
    onClick: onClick
  });
};

var Primary = function Primary(_ref3) {
  var caption = _ref3.caption,
      title = _ref3.title,
      onClick = _ref3.onClick;
  return _react["default"].createElement(_FlatButton["default"], {
    caption: caption,
    title: title,
    isPrimary: true,
    onClick: onClick
  });
};

var _default = {
  Primary: Primary,
  Clear: Clear,
  Close: Close,
  Flat: _FlatButton["default"]
};
exports["default"] = _default;
//# sourceMappingURL=Button.js.map