"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ModalPopup = _interopRequireDefault(require("../zhn-moleculs/ModalPopup"));
var _RowCheckBox = _interopRequireDefault(require("../dialogs/rows/RowCheckBox2"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_MENU_MORE = 'popup-menu charts__menu-more',
  S_MENU = {
    width: 240,
    paddingBottom: 8
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
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowCheckBox.default, {
      caption: "Filter Not Active Topic",
      onToggle: toggleFilter
    })
  });
};
var _default = BrowserMenuMore;
exports.default = _default;
//# sourceMappingURL=BrowserMenuMore.js.map