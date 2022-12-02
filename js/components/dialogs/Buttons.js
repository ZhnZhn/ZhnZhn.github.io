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

const ButtonLoad = _ref => {
  let {
    onClick
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
    style: S_LOAD,
    caption: "Load",
    title: "Load Item to Container",
    onClick: onClick
  });
};

exports.ButtonLoad = ButtonLoad;

const ButtonShow = _ref2 => {
  let {
    onClick
  } = _ref2;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlatButton.default, {
    style: S_SHOW,
    caption: "Show",
    title: "Show Item Container",
    onClick: onClick
  });
};

exports.ButtonShow = ButtonShow;
//# sourceMappingURL=Buttons.js.map