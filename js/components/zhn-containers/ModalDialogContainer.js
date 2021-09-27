"use strict";

exports.__esModule = true;
exports.default = void 0;

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from 'prop-types'
const CL_INIT = 'modal-root',
      CL_SHOWING = 'modal-root show-modal',
      S_SHOW = {
  display: 'block'
},
      S_HIDE = {
  display: 'none'
};

const ModalDialogContainer = ({
  isShow,
  timeout = 450,
  children,
  onClose
}) => {
  const [_className, _style] = isShow ? [CL_SHOWING, S_SHOW] : [CL_INIT, S_HIDE];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    role: "presentation",
    className: _className,
    style: _style,
    onClick: onClose,
    children: children
  });
};
/*
ModalDialogContainer.propTypes = {
  isShow  : PropTypes.bool,
  timeout : PropTypes.number,
  onClose : PropTypes.func
}
*/


var _default = ModalDialogContainer;
exports.default = _default;
//# sourceMappingURL=ModalDialogContainer.js.map