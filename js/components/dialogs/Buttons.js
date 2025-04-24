"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.ButtonShow = exports.ButtonLoad = void 0;
var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));
var _jsxRuntime = require("react/jsx-runtime");
const _fFlatButton = (caption, title) => _ref => {
  let {
    onClick
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
    caption: caption,
    title: title,
    onClick: onClick
  });
};
const ButtonLoad = exports.ButtonLoad = _fFlatButton("Load", "Load Item to Container");
const ButtonShow = exports.ButtonShow = _fFlatButton("Show", "Show Item Container");
//# sourceMappingURL=Buttons.js.map