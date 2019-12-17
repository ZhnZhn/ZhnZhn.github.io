"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _withTheme = _interopRequireDefault(require("../hoc/withTheme"));

var TH_ID = 'ELEMENT';
var CL = {
  SHOW: 'button-tab button-tab--show not-selected',
  NOT_SHOW: 'button-tab not-selected',
  ARROW: 'arrow-down'
};

var MenuTab =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(MenuTab, _Component);

  function MenuTab() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._refBtNode = function (node) {
      return _this.btNode = node;
    };

    return _this;
  }

  var _proto = MenuTab.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var onReg = this.props.onReg;

    if (typeof onReg === 'function') {
      onReg(this.btNode);
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        theme = _this$props.theme,
        isShow = _this$props.isShow,
        caption = _this$props.caption,
        style = _this$props.style,
        children = _this$props.children,
        onClick = _this$props.onClick,
        TS = theme.getStyle(TH_ID),
        _rootClass = isShow ? CL.SHOW : CL.NOT_SHOW;

    return _react["default"].createElement("div", {
      className: _rootClass,
      style: (0, _extends2["default"])({}, style, {}, TS.BG)
    }, _react["default"].createElement("div", {
      ref: this._refBtNode,
      onClick: onClick
    }, _react["default"].createElement("span", null, caption), _react["default"].createElement("span", {
      className: CL.ARROW
    })), children);
  };

  return MenuTab;
}(_react.Component);

var _default = (0, _withTheme["default"])(MenuTab);

exports["default"] = _default;
//# sourceMappingURL=MenuTab.js.map