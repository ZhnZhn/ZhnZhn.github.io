"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _FlatButton = _interopRequireDefault(require("../zhn-m/FlatButton"));

var _jsxRuntime = require("react/jsx-runtime");

const S_LOAD = {
  color: '#607d8b'
},
      S_SHOW = {
  color: '#232f3b'
};

const Load = _ref => {
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

const Show = _ref2 => {
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

var _default = {
  Load,
  Show,
  Flat: _FlatButton.default
};
exports.default = _default;
//# sourceMappingURL=Button.js.map