"use strict";

exports.__esModule = true;
exports.AlphaPerfItem = void 0;
var _TableItem = require("./TableItem");
var _jsxRuntime = require("react/jsx-runtime");
const S_TH_MORE = {
    paddingLeft: 12,
    textAlign: 'left'
  },
  CONFIG_PROP_NAMES = ['m', 'g', 'l'];
const AlphaPerfItem = _ref => {
  let {
    config,
    onCloseItem
  } = _ref;
  return CONFIG_PROP_NAMES.map(pn => /*#__PURE__*/(0, _jsxRuntime.jsx)(_TableItem.TableItem, {
    isInitialClose: true,
    thMoreStyle: S_TH_MORE,
    config: config[pn],
    onCloseItem: onCloseItem
  }, pn));
};
exports.AlphaPerfItem = AlphaPerfItem;
//# sourceMappingURL=AlphaPerfItem.js.map