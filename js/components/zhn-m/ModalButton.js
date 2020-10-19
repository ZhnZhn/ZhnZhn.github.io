"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _CaptionInput = _interopRequireDefault(require("./CaptionInput"));

var CL = {
  BT: 'bt-flat',
  BT_DIV: 'bt-flat__div',
  BT_SPAN: 'bt-flat__span'
};

var ModalButton = function ModalButton(_ref) {
  var refBt = _ref.refBt,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      rootStyle = _ref.rootStyle,
      _ref$clDiv = _ref.clDiv,
      clDiv = _ref$clDiv === void 0 ? CL.BT_DIV : _ref$clDiv,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? '' : _ref$title,
      caption = _ref.caption,
      accessKey = _ref.accessKey,
      children = _ref.children,
      onClick = _ref.onClick;

  var _className = (CL.BT + ' ' + className).trim(),
      _title = accessKey ? title + " [" + accessKey + "]" : title;

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    ref: refBt,
    type: "button",
    className: _className,
    style: rootStyle,
    accessKey: accessKey,
    title: _title,
    tabIndex: 0,
    onClick: onClick,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: clDiv,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CaptionInput["default"], {
        className: CL.BT_SPAN,
        caption: caption,
        accessKey: accessKey,
        children: children
      })
    })
  });
};

var _default = ModalButton;
exports["default"] = _default;
//# sourceMappingURL=ModalButton.js.map