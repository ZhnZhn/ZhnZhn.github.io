"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _CellColor = _interopRequireDefault(require("../zhn-moleculs/CellColor"));

var C_TRANSPARENT = "transparent";
var N_SHORT = 5;
var COLORS1 = ['#8abb5d', '#f7a35c', '#795548', '#f15c80', '#f45b5b', '#d2b772', '#dda0dd', '#fffafa'];
var COLORS2 = ['#f1d600', '#008b8b', '#2f7ed8', '#673ab7', '#000000', '#607d8b', '#7092be', '#c3c3c3'];
var S = {
  ROOT: {
    paddingTop: 6,
    paddingBottom: 4
  },
  ROW2: {
    paddingLeft: 56,
    paddingTop: 4
  },
  TO_CELL: {
    marginLeft: 12,
    marginRight: 12
  },
  CELL: {
    marginRight: 4,
    position: 'relative',
    display: 'inline-block',
    height: 32,
    width: 32,
    borderRadius: 2,
    verticalAlign: 'bottom',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  }
};

var _initColor = function _initColor(props) {
  return props.initColor || C_TRANSPARENT;
};

var SeriaColor =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(SeriaColor, _Component);

  function SeriaColor(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._hInit = function () {
      _this.setState({
        color: _initColor(_this.props)
      });
    };

    _this._hClick = function (color) {
      if (color) {
        _this.setState({
          color: color
        });
      }
    };

    _this._renderColors = function (colors, isLong) {
      var _max = isLong ? colors.length : N_SHORT;

      return colors.map(function (c, i) {
        return i < _max ? _react["default"].createElement(_CellColor["default"], {
          key: c,
          color: c,
          style: S.CELL,
          onClick: _this._hClick
        }) : null;
      }).filter(Boolean);
    };

    _this.state = {
      color: _initColor(props)
    };
    return _this;
  }

  var _proto = SeriaColor.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var onReg = this.props.onReg;

    if (typeof onReg === 'function') {
      onReg(this);
    }
  };

  _proto.render = function render() {
    var isLong = this.props.isLong,
        color = this.state.color;
    return _react["default"].createElement("div", {
      style: S.ROOT
    }, _react["default"].createElement("div", null, _react["default"].createElement(_CellColor["default"], {
      color: color,
      style: (0, _extends2["default"])({}, S.CELL, {}, S.TO_CELL),
      onClick: this._hInit
    }), this._renderColors(COLORS1, isLong)), _react["default"].createElement("div", {
      style: S.ROW2
    }, this._renderColors(COLORS2, isLong)));
  };

  _proto.getColor = function getColor() {
    var color = this.state.color;
    return color !== C_TRANSPARENT ? color : void 0;
  };

  return SeriaColor;
}(_react.Component);

var _default = SeriaColor;
exports["default"] = _default;
//# sourceMappingURL=SeriaColor.js.map