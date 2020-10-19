"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _DialogCell = _interopRequireDefault(require("./DialogCell"));

var _ButtonCircle = _interopRequireDefault(require("../zhn/ButtonCircle"));

var S = {
  ROW: {
    paddingTop: 4,
    paddingBottom: 8
  },
  BUTTON_CIRCLE: {
    marginLeft: 20
  }
};

var _renderButtons = function _renderButtons(buttons) {
  return buttons.map(function (button, index) {
    var caption = button.caption,
        title = button.title,
        onClick = button.onClick;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonCircle["default"], {
      caption: caption,
      title: title,
      style: S.BUTTON_CIRCLE,
      onClick: onClick
    }, caption + index);
  });
};

var ToolbarButtonCircle = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var _ref$buttons = _ref.buttons,
      buttons = _ref$buttons === void 0 ? [] : _ref$buttons;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].Row.Plain, {
    style: S.ROW,
    children: _renderButtons(buttons)
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