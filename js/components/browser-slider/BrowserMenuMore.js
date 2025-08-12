"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ModalPopup = require("../zhn-moleculs/ModalPopup");
var _InputSwitch = _interopRequireDefault(require("../zhn/InputSwitch"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_MENU_MORE = 'charts__menu-more',
  S_MENU = {
    width: 240,
    paddingBottom: 8
  },
  S_FILTER_TOPIC = {
    padding: '12px 12px 0 12px'
  };
const BrowserMenuMoreView = _ref => {
  let {
    toggleFilter
  } = _ref;
  const refFirstItem = (0, _ModalPopup.useModalPopup)()[0];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSwitch.default, {
    refEl: refFirstItem,
    style: S_FILTER_TOPIC,
    caption: "Filter Not Active Topic",
    onToggle: toggleFilter
  });
};
const BrowserMenuMore = (0, _ModalPopup.fCrModalPopup)(() => ({
  className: CL_MENU_MORE,
  style: S_MENU
}))(BrowserMenuMoreView);
var _default = exports.default = BrowserMenuMore;
//# sourceMappingURL=BrowserMenuMore.js.map