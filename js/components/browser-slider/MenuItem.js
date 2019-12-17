"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _Style = _interopRequireDefault(require("./Style"));

var CL = {
  ITEM: 'menu-item'
};

var MenuItem =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(MenuItem, _Component);

  function MenuItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._hKeyPress = function (evt) {
      evt.preventDefault();
      var which = evt.which;

      if (which === 13 || which === 32) {
        _this.props.onClick();
      }
    };

    _this._ref = function (n) {
      return _this._node = n;
    };

    _this.focus = function () {
      if (_this._node) {
        _this._node.focus();
      }
    };

    return _this;
  }

  var _proto = MenuItem.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        item = _this$props.item,
        onClick = _this$props.onClick,
        text = item.text,
        type = item.type,
        _style = type === 'l' ? _Style["default"].ITEM_L : _Style["default"].ITEM_T;

    return _react["default"].createElement("div", {
      ref: this._ref,
      className: CL.ITEM,
      style: _style,
      tabIndex: "0",
      role: "menuitem",
      onClick: onClick,
      onKeyPress: this._hKeyPress
    }, text);
  };

  return MenuItem;
}(_react.Component);

var _default = MenuItem;
exports["default"] = _default;
//# sourceMappingURL=MenuItem.js.map