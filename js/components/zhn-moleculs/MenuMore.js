"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _SvgMore = _interopRequireDefault(require("../zhn/SvgMore"));
var _ModalSlider = require("../zhn-modal-slider/ModalSlider");
var _jsxRuntime = require("react/jsx-runtime");
const CL_MENU_MORE = 'dialog__menu-more',
  S_BT_MORE = (0, _styleFn.crAbsoluteTopLeftStyle)(4, 2);
const MenuMore = props => /*#__PURE__*/(0, _jsxRuntime.jsx)(_uiApi.IfTrue, {
  v: props.menuModel,
  children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SvgMore.default, {
      refEl: props.refEl,
      style: S_BT_MORE,
      onClick: props.toggle
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalSlider.ModalSlider, {
      isShow: props.isMore,
      className: CL_MENU_MORE,
      model: props.menuModel,
      onClose: props.toggle
    })]
  })
});
var _default = exports.default = MenuMore;
//# sourceMappingURL=MenuMore.js.map