"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));
var _InputSwitch = _interopRequireDefault(require("../zhn/InputSwitch"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_MENU_MORE = 'charts__menu-more',
  S_MENU = {
    width: 240,
    paddingBottom: 8
  },
  S_FILTER_TOPIC = {
    padding: '12px 0 0 12px'
  };
const BrowserMenuMore = _ref => {
  let {
    is,
    toggleMenu,
    toggleFilter
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPopup.default, {
    isShow: is,
    className: CL_MENU_MORE,
    style: S_MENU,
    onClose: toggleMenu,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSwitch.default, {
      style: S_FILTER_TOPIC,
      caption: "Filter Not Active Topic",
      onToggle: toggleFilter
    })
  });
};
var _default = exports.default = BrowserMenuMore;
//# sourceMappingURL=BrowserMenuMore.js.map