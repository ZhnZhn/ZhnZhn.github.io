"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _useKeyEnter = _interopRequireDefault(require("../hooks/useKeyEnter"));

var _crCn = _interopRequireDefault(require("../zhn-utils/crCn"));

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from 'prop-types'
const CL_INPUT_COLOR = 'input-color';
const CellColor = /*#__PURE__*/(0, _react.forwardRef)(({
  className,
  style,
  color,
  onClick,
  children
}, ref) => {
  const _cn = (0, _crCn.default)(className, CL_INPUT_COLOR),
        _bgColorStyle = color ? {
    backgroundColor: color
  } : void 0,
        _onClick = onClick ? event => onClick(color, event) : void 0,
        _onKeyEnter = (0, _useKeyEnter.default)(_onClick, [_onClick]);

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    ref: ref,
    tabIndex: "0",
    role: "button",
    className: _cn,
    style: { ...style,
      ..._bgColorStyle
    },
    onClick: _onClick,
    onKeyDown: _onKeyEnter,
    children: children
  });
});
/*
CellColor.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.string,
  onClick: PropTypes.func
}
*/

var _default = CellColor;
exports.default = _default;
//# sourceMappingURL=CellColor.js.map