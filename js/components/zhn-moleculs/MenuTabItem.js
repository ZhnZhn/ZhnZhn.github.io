"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _MenuTab = _interopRequireDefault(require("./MenuTab"));

var MenuTabItem =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(MenuTabItem, _Component);

  function MenuTabItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      isShow: false
    };

    _this._hClickTab = function () {
      _this.setState(function (prevState) {
        return {
          isShow: !prevState.isShow
        };
      });
    };

    _this._hCloseTab = function (event) {
      _this.setState({
        isShow: false
      });
    };

    _this._hRegTab = function (node) {
      _this.tabNode = node;
    };

    _this._renderChildren = function (children, isShow) {
      return _react["default"].Children.map(children, function (child) {
        return _react["default"].cloneElement(child, {
          isShow: isShow,
          onClose: _this._hCloseTab
        });
      });
    };

    return _this;
  }

  var _proto = MenuTabItem.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        style = _this$props.style,
        caption = _this$props.caption,
        children = _this$props.children,
        isShow = this.state.isShow;
    return _react["default"].createElement(_MenuTab["default"], {
      style: style,
      isShow: isShow,
      caption: caption,
      onClick: this._hClickTab,
      onReg: this._hRegTab
    }, this._renderChildren(children, isShow));
  };

  return MenuTabItem;
}(_react.Component);

var _default = MenuTabItem;
exports["default"] = _default;
//# sourceMappingURL=MenuTabItem.js.map