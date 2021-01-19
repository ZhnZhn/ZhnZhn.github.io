"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _useForceUpdate = _interopRequireDefault(require("../hooks/useForceUpdate"));

//import PropTypes from 'prop-types'
var CL = {
  INIT: 'modal-root',
  SHOWING: 'modal-root show-modal',
  HIDING: 'modal-root hide-modal'
};
var S = {
  SHOW: {
    display: 'block'
  },
  HIDE: {
    display: 'none'
  },
  HIDE_BACKGROUND: {
    backgroundColor: 'rgba(0,0,0, 0)'
  }
};

var ModalDialogContainer = function ModalDialogContainer(_ref) {
  var isShow = _ref.isShow,
      _ref$timeout = _ref.timeout,
      timeout = _ref$timeout === void 0 ? 450 : _ref$timeout,
      children = _ref.children,
      onClose = _ref.onClose;

  var _refWasClosing = (0, _react.useRef)(true),
      forceUpdate = (0, _useForceUpdate["default"])();

  (0, _react.useEffect)(function () {
    var current = _refWasClosing.current;

    if (current) {
      setTimeout(forceUpdate, timeout);
    }
  });

  var _className, _style;

  if (_refWasClosing.current) {
    _className = CL.INIT;
    _style = S.HIDE;
    _refWasClosing.current = false;
  } else {
    _className = isShow ? CL.SHOWING : CL.HIDING;
    _style = isShow ? S.SHOW : S.HIDE_BACKGROUND;

    if (!isShow) {
      _refWasClosing.current = true;
    }
  }

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
exports["default"] = _default;
//# sourceMappingURL=ModalDialogContainer.js.map