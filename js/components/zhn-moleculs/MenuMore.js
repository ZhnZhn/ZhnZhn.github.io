"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _SvgMore = _interopRequireDefault(require("../zhn/SvgMore"));

var _ModalSlider = _interopRequireDefault(require("../zhn-modal-slider/ModalSlider"));

var _jsxRuntime = require("react/jsx-runtime");

const CL_MENU_MORE = 'popup-menu dialog__menu-more',
      S_BT_MORE = {
  position: 'absolute',
  top: 1,
  left: 2
};
const MenuMore = /*#__PURE__*/(0, _react.forwardRef)(({
  isMore,
  menuModel,
  TS,
  toggle
}, ref) => {
  if (!menuModel) {
    return null;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgMore.default, {
      ref: ref,
      style: S_BT_MORE,
      onClick: toggle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalSlider.default, {
      isShow: isMore,
      className: CL_MENU_MORE,
      style: TS.EL_BORDER,
      model: menuModel,
      onClose: toggle
    })]
  });
});
var _default = MenuMore;
exports.default = _default;
//# sourceMappingURL=MenuMore.js.map