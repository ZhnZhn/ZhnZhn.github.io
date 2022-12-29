"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));
var _jsxRuntime = require("react/jsx-runtime");
const S_BT = {
  color: '#232f3b'
};
const Clear = _ref => {
  let {
    onClick
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
    style: S_BT,
    caption: "Clear",
    title: "Clear Input",
    onClick: onClick
  });
};
const Close = _ref2 => {
  let {
    onClick
  } = _ref2;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
    style: S_BT,
    caption: "Close",
    title: "Close Dialog",
    onClick: onClick
  });
};
const Primary = _ref3 => {
  let {
    caption,
    title,
    onClick
  } = _ref3;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
    caption: caption,
    title: title,
    isPrimary: true,
    onClick: onClick
  });
};
var _default = {
  Primary,
  Clear,
  Close,
  Flat: _FlatButton.default
};
exports.default = _default;
//# sourceMappingURL=Button.js.map