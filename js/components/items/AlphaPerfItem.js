"use strict";

exports.__esModule = true;
exports.AlphaPerfItem = void 0;
var _TableItem = require("./TableItem");
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
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TableItem.TableItem, {
      isInitialClose: true,
      thMoreStyle: S_TH_MORE,
      config: config.m,
      onCloseItem: onCloseItem
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TableItem.TableItem, {
      isInitialClose: true,
      thMoreStyle: S_TH_MORE,
      config: config.g,
      onCloseItem: onCloseItem
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_TableItem.TableItem, {
      isInitialClose: true,
      thMoreStyle: S_TH_MORE,
      config: config.l,
      onCloseItem: onCloseItem
    })]
  });
};
exports.AlphaPerfItem = AlphaPerfItem;
//# sourceMappingURL=AlphaPerfItem.js.map