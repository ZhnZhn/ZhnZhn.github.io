"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _DialogCell = _interopRequireDefault(require("./DialogCell"));

var _ButtonCircle = _interopRequireDefault(require("../zhn/ButtonCircle"));

var _ItemStack = _interopRequireDefault(require("../zhn/ItemStack"));

var S = {
  ROW: {
    paddingTop: 2,
    paddingBottom: 4
  },
  BUTTON_CIRCLE: {
    marginLeft: 20
  }
};

var _crButton = function _crButton(_ref, index) {
  var caption = _ref.caption,
      title = _ref.title,
      onClick = _ref.onClick;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonCircle["default"], {
    style: S.BUTTON_CIRCLE,
    caption: caption,
    title: title,
    onClick: onClick
  }, caption + index);
};

var ToolbarButtonCircle = /*#__PURE__*/(0, _react.memo)(function (_ref2) {
  var buttons = _ref2.buttons;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].Row.Plain, {
    style: S.ROW,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack["default"], {
      items: buttons,
      crItem: _crButton
    })
  });
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
exports["default"] = _default;
//# sourceMappingURL=ToolbarButtonCircle.js.map