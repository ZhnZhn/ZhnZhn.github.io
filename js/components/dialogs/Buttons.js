"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.ButtonShow = exports.ButtonLoad = void 0;
var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));
var _jsxRuntime = require("react/jsx-runtime");
const S_LOAD = {
    color: '#607d8b'
  },
  S_SHOW = {
    color: '#232f3b'
  };
const _fFlatButton = (style, caption, title) => _ref => {
  let {
    onClick
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
    style: style,
    caption: caption,
    title: title,
    onClick: onClick
  });
};
const ButtonLoad = exports.ButtonLoad = _fFlatButton(S_LOAD, "Load", "Load Item to Container");
const ButtonShow = exports.ButtonShow = _fFlatButton(S_SHOW, "Show", "Show Item Container");
//# sourceMappingURL=Buttons.js.map