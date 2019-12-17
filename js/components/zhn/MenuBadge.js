"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _withTheme = _interopRequireDefault(require("../hoc/withTheme"));

var _ButtonCircle = _interopRequireDefault(require("./ButtonCircle2"));

var TH_ID = 'ELEMENT';
var CL = "menu__badge";
var S = {
  /*
  BT: {
    backgroundColor: '#1b2836'
  },
  */
  BADGE_OPENED: {
    color: 'rgba(164, 135, 212, 1)'
  }
};

var MenuBadge =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(MenuBadge, _Component);

  function MenuBadge() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._hClick = function (event) {
      event.stopPropagation();

      if (!_this.props.isOpen) {
        _this.props.onClick();
      } else {
        _this.props.onBadgeClose();
      }
    };

    return _this;
  }

  var _proto = MenuBadge.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        theme = _this$props.theme,
        counter = _this$props.counter,
        isOpen = _this$props.isOpen,
        TS = theme.getStyle(TH_ID),
        _btStyle = isOpen ? S.BADGE_OPENED : null;

    return _react["default"].createElement(_ButtonCircle["default"], {
      className: CL,
      style: (0, _extends2["default"])({}, S.BT, {}, _btStyle, {}, TS.BG),
      caption: counter,
      onClick: this._hClick
    });
  };

  return MenuBadge;
}(_react.Component);

var _default = (0, _withTheme["default"])(MenuBadge);

exports["default"] = _default;
//# sourceMappingURL=MenuBadge.js.map