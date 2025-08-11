"use strict";

exports.__esModule = true;
exports.default = void 0;
var _ModalPopup = require("../../zhn-moleculs/ModalPopup");
var _Style = require("./Style");
var _jsxRuntime = require("react/jsx-runtime");
const fModalPopup = Comp => _ref => {
  let {
    isShow,
    style,
    className,
    onClose,
    ...restProps
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ModalPopup.ModalPopup, {
    isShow: isShow,
    className: className,
    style: {
      ..._Style.S_MODAL_POPUP,
      ...style
    },
    onClose: onClose,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Comp, {
      ...restProps
    })
  });
};
var _default = exports.default = fModalPopup;
//# sourceMappingURL=fModalPopup.js.map