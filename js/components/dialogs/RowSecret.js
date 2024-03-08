"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _InputSecret = _interopRequireDefault(require("../zhn/InputSecret"));
var _SpanToken = require("../zhn/SpanToken");
var _jsxRuntime = require("react/jsx-runtime");
const S_LABEL = {
  display: 'flex',
  margin: '5px 0'
};
const RowSecret = (0, _uiApi.forwardRef)((_ref, ref) => {
  let {
    isTitle,
    title,
    titleStyle,
    ...rest
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("form", {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("label", {
      style: S_LABEL,
      children: [isTitle && title && /*#__PURE__*/(0, _jsxRuntime.jsx)(_SpanToken.SpanInputLabel, {
        style: titleStyle,
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
var _default = exports.default = RowSecret;
//# sourceMappingURL=RowSecret.js.map