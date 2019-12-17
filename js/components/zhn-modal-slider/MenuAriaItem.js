"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _fKeyPressed = function _fKeyPressed(onClick) {
  return function (evt) {
    evt.preventDefault();
    var which = evt.which;

    if (which === 13 || which === 32) {
      onClick();
    }
  };
};

var MenuAriaItem =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(MenuAriaItem, _Component);

  function MenuAriaItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._ref = function (n) {
      return _this._node = n;
    };

    return _this;
  }

  var _proto = MenuAriaItem.prototype;

  /*
  static propTypes = {
    onClick: PropTypes.func,
    onReg: PropTypes.func
  }
  */
  _proto.componentDidMount = function componentDidMount() {
    var onReg = this.props.onReg;

    if (this._node && typeof onReg === 'function') {
      onReg(this._node);
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        onClick = _this$props.onClick,
        onReg = _this$props.onReg,
        rest = (0, _objectWithoutPropertiesLoose2["default"])(_this$props, ["children", "onClick", "onReg"]);
    return _react["default"].createElement("div", (0, _extends2["default"])({}, rest, {
      ref: onReg ? this._ref : void 0,
      role: "menuitem",
      tabIndex: "0",
      onClick: onClick,
      onKeyPress: _fKeyPressed(onClick)
    }), children);
  };

  return MenuAriaItem;
}(_react.Component);

var _default = MenuAriaItem;
exports["default"] = _default;
//# sourceMappingURL=MenuAriaItem.js.map