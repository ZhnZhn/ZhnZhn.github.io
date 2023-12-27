"use strict";

exports.__esModule = true;
exports.default = void 0;
var _a11yFn = require("../a11yFn");
var _styleFn = require("../styleFn");
var _jsxRuntime = require("react/jsx-runtime");
const CL_MODAL_ROOT = 'modal-root',
  CL_MODAL_ROOT_SHOWING = `${CL_MODAL_ROOT} show-modal`;
const ModalDialogContainer = _ref => {
  let {
    isShow,
    onClose,
    children
  } = _ref;
  const [_className, _style] = isShow ? [CL_MODAL_ROOT_SHOWING, _styleFn.S_BLOCK] : [CL_MODAL_ROOT, _styleFn.S_NONE];
  /*eslint-disable jsx-a11y/no-static-element-interactions*/
  /*eslint-disable jsx-a11y/click-events-have-key-events*/
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ...(0, _a11yFn.crPresentationRole)(isShow),
    className: _className,
    style: _style,
    onClick: onClose,
    children: children
  });
  /*eslint-enable jsx-a11y/no-static-element-interactions*/
  /*eslint-enable jsx-a11y/click-events-have-key-events*/
};
var _default = exports.default = ModalDialogContainer;
//# sourceMappingURL=ModalDialogContainer.js.map