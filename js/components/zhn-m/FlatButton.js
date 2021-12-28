"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _useThrottleClick = _interopRequireDefault(require("../hooks/useThrottleClick"));

var _crCn = _interopRequireDefault(require("../zhn-utils/crCn"));

var _has = _interopRequireDefault(require("../has"));

var _BtCaption = _interopRequireDefault(require("./BtCaption"));

var _jsxRuntime = require("react/jsx-runtime");

var HAS_TOUCH = _has.default.touch,
    CL_ARROW = "arrow-down",
    CL_BT_FLAT = 'bt-flat',
    CL_BT_FLAT_CAPTION = 'bt-flat__caption',
    S_PRIMARY = {
  color: '#607d8b'
};

var FlatButton = function FlatButton(_ref) {
  var refBt = _ref.refBt,
      isArrow = _ref.isArrow,
      _ref$timeout = _ref.timeout,
      timeout = _ref$timeout === void 0 ? 3000 : _ref$timeout,
      className = _ref.className,
      style = _ref.style,
      isPrimary = _ref.isPrimary,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? '' : _ref$title,
      caption = _ref.caption,
      accessKey = _ref.accessKey,
      children = _ref.children,
      onClick = _ref.onClick;

  var _hClick = (0, _useThrottleClick.default)(timeout, onClick),
      _className = (0, _crCn.default)(CL_BT_FLAT, className),
      _style = isPrimary ? Object.assign({}, style, S_PRIMARY) : style,
      _accessKey = HAS_TOUCH ? '' : accessKey,
      _title = _accessKey ? title + " [" + _accessKey + "]" : title;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
    ref: refBt,
    className: _className,
    style: _style,
    accessKey: _accessKey,
    title: _title,
    onClick: _hClick,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BtCaption.default, {
      className: CL_BT_FLAT_CAPTION,
      caption: caption,
      accessKey: _accessKey,
      children: isArrow && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: CL_ARROW
      })
    }), children]
  });
};

var _default = FlatButton;
exports.default = _default;
//# sourceMappingURL=FlatButton.js.map