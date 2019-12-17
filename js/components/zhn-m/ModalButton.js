"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _CaptionInput = _interopRequireDefault(require("./CaptionInput"));

var CL = {
  BT: 'bt-flat',
  BT_DIV: 'bt-flat__div',
  BT_SPAN: 'bt-flat__span'
};

var ModalButton =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(ModalButton, _Component);

  function ModalButton() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._refNode = function (n) {
      return _this.rootNode = n;
    };

    return _this;
  }

  var _proto = ModalButton.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var onReg = this.props.onReg;

    if (typeof onReg === 'function') {
      onReg(this.rootNode);
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        _this$props$className = _this$props.className,
        className = _this$props$className === void 0 ? '' : _this$props$className,
        rootStyle = _this$props.rootStyle,
        _this$props$clDiv = _this$props.clDiv,
        clDiv = _this$props$clDiv === void 0 ? CL.BT_DIV : _this$props$clDiv,
        _this$props$title = _this$props.title,
        title = _this$props$title === void 0 ? '' : _this$props$title,
        caption = _this$props.caption,
        accessKey = _this$props.accessKey,
        children = _this$props.children,
        onClick = _this$props.onClick,
        _className = (CL.BT + ' ' + className).trim(),
        _title = accessKey ? title + " [" + accessKey + "]" : title;

    return _react["default"].createElement("button", {
      type: "button",
      ref: this._refNode,
      className: _className,
      style: rootStyle,
      accessKey: accessKey,
      title: _title,
      tabIndex: 0,
      onClick: onClick
    }, _react["default"].createElement("div", {
      className: clDiv
    }, _react["default"].createElement(_CaptionInput["default"], {
      className: CL.BT_SPAN,
      caption: caption,
      accessKey: accessKey
    }, children)));
  };

  return ModalButton;
}(_react.Component);

var _default = ModalButton;
exports["default"] = _default;
//# sourceMappingURL=ModalButton.js.map