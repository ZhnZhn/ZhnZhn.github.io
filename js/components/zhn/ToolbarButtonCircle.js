"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ButtonCircle = _interopRequireDefault(require("./ButtonCircle"));
var _ItemStack = _interopRequireDefault(require("./ItemStack"));
var _jsxRuntime = require("react/jsx-runtime");
const S_TOOLBAR = {
    display: 'flex',
    alignItems: 'center',
    padding: '6px 5px'
  },
  S_BUTTON_CIRCLE = {
    marginLeft: 20
  };
const _crButtonItem = (_ref, index) => {
  let {
    caption,
    title,
    onClick
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonCircle.default, {
    style: S_BUTTON_CIRCLE,
    caption: caption,
    title: title,
    onClick: onClick
  }, caption + index);
};
const ToolbarButtonCircle = _ref2 => {
  let {
    buttons
  } = _ref2;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: S_TOOLBAR,
    role: "toolbar",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
      items: buttons,
      crItem: _crButtonItem
    })
  });
};

/*
ToolbarButtonCircle.propTypes = {
  buttons: PropTypes.arrayOf(
     PropTypes.shape({
      caption: PropTypes.string,
      title: PropTypes.string,
      onClick: PropTypes.func
    })
  ),
}
*/
var _default = ToolbarButtonCircle;
exports.default = _default;
//# sourceMappingURL=ToolbarButtonCircle.js.map