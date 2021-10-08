"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _DialogCell = _interopRequireDefault(require("./DialogCell"));

var _ButtonCircle = _interopRequireDefault(require("../zhn/ButtonCircle"));

var _ItemStack = _interopRequireDefault(require("../zhn/ItemStack"));

var _jsxRuntime = require("react/jsx-runtime");

const S_ROW = {
  padding: '2px 0 4px 0'
},
      S_BUTTON_CIRCLE = {
  marginLeft: 20
};

const _crButtonItem = ({
  caption,
  title,
  onClick
}, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonCircle.default, {
  style: S_BUTTON_CIRCLE,
  caption: caption,
  title: title,
  onClick: onClick
}, caption + index);

const ToolbarButtonCircle = ({
  buttons
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell.default.Row.Plain, {
  style: S_ROW,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
    items: buttons,
    crItem: _crButtonItem
  })
});
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