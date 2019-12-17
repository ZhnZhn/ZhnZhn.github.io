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

var MenuTitle =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(MenuTitle, _Component);

  function MenuTitle() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._refNode = function (n) {
      return _this._node = n;
    };

    _this.focus = function () {
      if (_this._node) {
        _this._node.focus();
      }
    };

    return _this;
  }

  var _proto = MenuTitle.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        _this$props$title = _this$props.title,
        title = _this$props$title === void 0 ? '' : _this$props$title,
        onClick = _this$props.onClick;
    return _react["default"].createElement("div", {
      ref: this._refNode,
      className: CL.ITEM,
      style: _Style["default"].TITLE,
      role: "menuitem",
      tabIndex: "0",
      onClick: onClick,
      onKeyPress: function onKeyPress(evt) {
        evt.preventDefault();
        var which = evt.which;

        if (which === 13 || which === 32) {
          onClick();
        }
      }
    }, title, _react["default"].createElement("span", {
      style: _Style["default"].TITLE_ARROW
    }, '<'));
  };

  return MenuTitle;
}(_react.Component);

var _default = MenuTitle;
exports["default"] = _default;
//# sourceMappingURL=MenuTitle.js.map