"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _SvgMore = _interopRequireDefault(require("../zhn/SvgMore"));
var _ModalSlider = require("../zhn-modal-slider/ModalSlider");
var _jsxRuntime = require("react/jsx-runtime");
const CL_MENU_MORE = (0, _styleFn.crElementBorderCn)('dialog__menu-more'),
  S_BT_MORE = (0, _styleFn.crAbsoluteTopLeftStyle)(1, 2);
const MenuMore = _ref => {
  let {
    refEl,
    isMore,
    menuModel,
    toggle
  } = _ref;
  return menuModel ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgMore.default, {
      refEl: refEl,
      style: S_BT_MORE,
      onClick: toggle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalSlider.ModalSlider, {
      isShow: isMore,
      className: CL_MENU_MORE,
      model: menuModel,
      onClose: toggle
    })]
  }) : null;
};
var _default = exports.default = MenuMore;
//# sourceMappingURL=MenuMore.js.map