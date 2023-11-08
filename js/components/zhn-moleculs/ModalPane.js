"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _useClickOutside = _interopRequireDefault(require("../hooks/useClickOutside"));
var _fUseKey = require("../hooks/fUseKey");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from 'prop-types'

const CL_MODAL_PANE = (0, _styleFn.crContainerCn)();
const ModalPane = _ref => {
  let {
    isShow,
    style,
    children,
    onClose
  } = _ref;
  const _refNode = (0, _useClickOutside.default)(isShow, onClose),
    _hKeyEscape = (0, _fUseKey.useKeyEscape)(onClose),
    _hKeyDown = isShow ? _hKeyEscape : void 0;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    role: "presentation",
    "aria-hidden": !isShow,
    ref: _refNode,
    className: CL_MODAL_PANE,
    style: style,
    onKeyDown: _hKeyDown,
    children: children
  });
};

/*
ModalPane.propTypes = {
 className: PropTypes.string,
 style: PropTypes.object,
 isShow: PropTypes.bool,
 onClose: PropTypes.func
}
*/
var _default = exports.default = ModalPane;
//# sourceMappingURL=ModalPane.js.map