"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _useClickOutside = _interopRequireDefault(require("../hooks/useClickOutside"));
var _fUseKey = require("../hooks/fUseKey");
var _jsxRuntime = require("react/jsx-runtime");
const CL_MODAL_PANE = (0, _styleFn.crContainerCn)(_styleFn.CL_POPUP_MENU);
const ModalPane = _ref => {
  let {
    isShow,
    className,
    style,
    children,
    onClose,
    ...restProps
  } = _ref;
  const _refNode = (0, _useClickOutside.default)(isShow, onClose),
    _hKeyEscape = (0, _fUseKey.useKeyEscape)(onClose);
  /*eslint-disable jsx-a11y/no-static-element-interactions*/
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ...restProps,
    ref: _refNode,
    className: (0, _styleFn.crCn)(CL_MODAL_PANE, className),
    style: style,
    hidden: !isShow,
    onKeyDown: isShow ? _hKeyEscape : void 0,
    children: children
  });
  /*eslint-enable jsx-a11y/no-static-element-interactions*/
};
var _default = exports.default = ModalPane;
//# sourceMappingURL=ModalPane.js.map