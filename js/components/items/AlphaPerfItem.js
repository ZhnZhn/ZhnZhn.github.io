"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _TableItem = _interopRequireDefault(require("./TableItem"));

var _jsxRuntime = require("react/jsx-runtime");

const S_TH_MORE = {
  paddingLeft: 12,
  textAlign: 'left'
};

const AlphaPerfItem = _ref => {
  let {
    config,
    onCloseItem
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TableItem.default, {
      thMoreStyle: S_TH_MORE,
      config: config.m,
      onCloseItem: onCloseItem
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TableItem.default, {
      thMoreStyle: S_TH_MORE,
      config: config.y,
      onCloseItem: onCloseItem
    })]
  });
};

var _default = AlphaPerfItem;
exports.default = _default;
//# sourceMappingURL=AlphaPerfItem.js.map