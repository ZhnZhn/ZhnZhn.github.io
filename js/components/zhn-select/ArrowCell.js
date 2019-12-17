"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var STYLE = {
  ARROW_CELL: {
    position: 'absolute',
    top: '10px',
    right: '0px',
    cursor: 'pointer',
    textAlign: 'center',
    verticalAlign: 'middle',
    width: '35px',
    paddingRight: '5px'
  },
  ARROW: {
    position: 'relative',
    top: '2px',
    borderColor: '#999 transparent transparent',
    borderStyle: 'solid',
    //borderWidth: '5px 5px 2.5px',
    borderWidth: '10px 8px 4px',
    display: 'inline-block',
    height: '0px',
    width: '0px'
  }
};
var C = {
  ANIMATION_CIRCLE: "circle infinite 1.25s linear",
  BORDER_COLOR: "rgb(27, 117, 187) transparent transparent"
};

var ArrowCell =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(ArrowCell, _Component);

  function ArrowCell() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _this._refArrowCell = function (n) {
      return _this.arrowCell = n;
    };

    _this._refArrow = function (n) {
      return _this.arrow = n;
    };

    _this.startAnimation = function () {
      _this.arrowCell.style.animation = C.ANIMATION_CIRCLE;
      _this.arrow.style.borderColor = C.BORDER_COLOR;
    };

    _this.stopAnimation = function () {
      _this.arrowCell.style.animation = "";
    };

    return _this;
  }

  var _proto = ArrowCell.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        arrowStyle = _this$props.arrowStyle,
        onClick = _this$props.onClick;
    return _react["default"].createElement("span", {
      ref: this._refArrowCell,
      style: STYLE.ARROW_CELL,
      onClick: onClick
    }, _react["default"].createElement("span", {
      ref: this._refArrow,
      style: (0, _extends2["default"])({}, STYLE.ARROW, {}, arrowStyle)
    }));
  };

  return ArrowCell;
}(_react.Component);

var _default = ArrowCell;
exports["default"] = _default;
//# sourceMappingURL=ArrowCell.js.map