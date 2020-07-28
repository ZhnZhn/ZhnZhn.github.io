"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _CaptionInput = _interopRequireDefault(require("./CaptionInput"));

var CL = {
  BT: 'bt-flat',
  BT_DIV: 'bt-flat__div',
  BT_SPAN: 'bt-flat__span'
};
var S = {
  PRIMARY: {
    color: '#607d8b'
  }
};
var POINTER_EVENTS = 'pointer-events';

var _isNotZeroNumber = function _isNotZeroNumber(n) {
  return n && typeof n === 'number' && n - n === 0;
};

var _setPointerEvents = function _setPointerEvents(refBt, value) {
  if (value === void 0) {
    value = 'auto';
  }

  var btNode = refBt && refBt.current;

  if (btNode && btNode.style) {
    btNode.style[POINTER_EVENTS] = value;
  }
};

var FlatButton = function FlatButton(_ref) {
  var _ref$timeout = _ref.timeout,
      timeout = _ref$timeout === void 0 ? 3000 : _ref$timeout,
      className = _ref.className,
      style = _ref.style,
      _ref$clDiv = _ref.clDiv,
      clDiv = _ref$clDiv === void 0 ? CL.BT_DIV : _ref$clDiv,
      isPrimary = _ref.isPrimary,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? '' : _ref$title,
      caption = _ref.caption,
      accessKey = _ref.accessKey,
      children = _ref.children,
      onClick = _ref.onClick;

  var refBt = (0, _react.useRef)(null),
      _hClick = (0, _react.useCallback)(function (event) {
    if (_isNotZeroNumber(timeout)) {
      _setPointerEvents(refBt, 'none');

      setTimeout(function () {
        return _setPointerEvents(refBt);
      }, timeout);
    }

    onClick(event);
  }, [timeout, onClick]),
      _style = isPrimary ? (0, _extends2["default"])({}, style, S.PRIMARY) : style,
      _className = className ? CL.BT + " " + className : CL.BT,
      _title = accessKey ? title + " [" + accessKey + "]" : title;

  return /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    ref: refBt,
    className: _className,
    style: _style,
    accessKey: accessKey,
    tabIndex: 0,
    title: _title,
    onClick: _hClick
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: clDiv
  }, /*#__PURE__*/_react["default"].createElement(_CaptionInput["default"], {
    className: CL.BT_SPAN,
    caption: caption,
    accessKey: accessKey
  }), children));
};

var _default = FlatButton;
exports["default"] = _default;
//# sourceMappingURL=FlatButton.js.map