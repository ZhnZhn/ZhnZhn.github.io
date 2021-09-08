"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _InputSecret = _interopRequireDefault(require("../zhn/InputSecret"));

var _DialogStyles = _interopRequireDefault(require("../styles/DialogStyles"));

var _jsxRuntime = require("react/jsx-runtime");

const RowSecret = /*#__PURE__*/(0, _react.forwardRef)(({
  isTitle,
  title,
  titleStyle,
  ...rest
}, ref) => {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("form", {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
      style: _DialogStyles.default.ROW,
      children: [isTitle && title && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        style: { ..._DialogStyles.default.CAPTION,
          ...titleStyle
        },
        children: title
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_InputSecret.default, {
        ref: ref,
        ...rest
      })]
    })
  });
});
/*
RowSecret.propTypes = {
  title: PropTypes.string,
  titleStyle: PropTypes.object
}
*/

var _default = RowSecret;
exports.default = _default;
//# sourceMappingURL=RowSecret.js.map