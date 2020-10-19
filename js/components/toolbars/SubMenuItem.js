"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _memoEqual = _interopRequireDefault(require("../hoc/memoEqual"));

var _useToggle2 = _interopRequireDefault(require("../hooks/useToggle"));

//import PropTypes from "prop-types";
var CL = "bt-sub-item";
var S = {
  ACTIVE: {
    fontWeight: 'bold'
  }
};

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var SubMenuItem = (0, _memoEqual["default"])(function (_ref) {
  var caption = _ref.caption,
      _ref$initialIsActive = _ref.initialIsActive,
      initialIsActive = _ref$initialIsActive === void 0 ? false : _ref$initialIsActive,
      onClick = _ref.onClick,
      onClose = _ref.onClose;

  var _useToggle = (0, _useToggle2["default"])(initialIsActive),
      isActive = _useToggle[0],
      toggleIsAcive = _useToggle[1],
      _hClick = function _hClick() {
    onClick();

    if (_isFn(onClose)) {
      onClose();
    } else {
      toggleIsAcive();
    }
  };

  if (!_isFn(onClick)) {
    return null;
  }

  var _style = isActive ? S.ACTIVE : null;

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    className: CL,
    style: _style,
    onClick: _hClick,
    children: caption
  });
});
/*
SubMenuItem.propTypes = {
  caption: PropTypes.string,
  initialIsActive: PropTypes.bool,
  onClick: PropTypes.func,
  onClose: PropTypes.func
}
*/

var _default = SubMenuItem;
exports["default"] = _default;
//# sourceMappingURL=SubMenuItem.js.map