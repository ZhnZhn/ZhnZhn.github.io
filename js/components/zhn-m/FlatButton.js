"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

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

var FlatButton =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(FlatButton, _Component);

  function FlatButton() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._setPointerEvents = function (value) {
      if (value === void 0) {
        value = 'auto';
      }

      if ((0, _assertThisInitialized2["default"])(_this) && _this.rootNode && _this.rootNode.style) {
        _this.rootNode.style[POINTER_EVENTS] = value;
      }
    };

    _this._hClick = function (event) {
      _this._setPointerEvents('none');

      var _this$props = _this.props,
          timeout = _this$props.timeout,
          onClick = _this$props.onClick;
      setTimeout(_this._setPointerEvents, timeout);
      onClick(event);
    };

    _this._refNode = function (node) {
      return _this.rootNode = node;
    };

    return _this;
  }

  var _proto = FlatButton.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        className = _this$props2.className,
        rootStyle = _this$props2.rootStyle,
        _this$props2$clDiv = _this$props2.clDiv,
        clDiv = _this$props2$clDiv === void 0 ? CL.BT_DIV : _this$props2$clDiv,
        isPrimary = _this$props2.isPrimary,
        _this$props2$title = _this$props2.title,
        title = _this$props2$title === void 0 ? '' : _this$props2$title,
        caption = _this$props2.caption,
        accessKey = _this$props2.accessKey,
        children = _this$props2.children,
        _style = isPrimary ? (0, _extends2["default"])({}, rootStyle, {}, S.PRIMARY) : rootStyle,
        _className = className ? CL.BT + " " + className : CL.BT,
        _title = accessKey ? title + " [" + accessKey + "]" : title;

    return _react["default"].createElement("button", {
      type: "button",
      ref: this._refNode,
      className: _className,
      style: _style,
      accessKey: accessKey,
      tabIndex: 0,
      title: _title,
      onClick: this._hClick
    }, _react["default"].createElement("div", {
      className: clDiv
    }, _react["default"].createElement(_CaptionInput["default"], {
      className: CL.BT_SPAN,
      caption: caption,
      accessKey: accessKey
    }), children));
  };

  return FlatButton;
}(_react.Component);

FlatButton.defaultProps = {
  timeout: 3000
};
var _default = FlatButton;
exports["default"] = _default;
//# sourceMappingURL=FlatButton.js.map