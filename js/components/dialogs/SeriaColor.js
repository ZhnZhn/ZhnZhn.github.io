"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _CellColor = _interopRequireDefault(require("../zhn-moleculs/CellColor"));

var _BtCounter = _interopRequireDefault(require("./BtCounter"));

var C_TRANSPARENT = "transparent";
var N_SHORT = 5;
var COLORS1 = ['#8abb5d', '#f7a35c', '#795548', '#f15c80', '#f45b5b', '#d2b772', '#dda0dd', '#fffafa'];
var COLORS2 = ['#f1d600', '#008b8b', '#2f7ed8', '#673ab7', '#000000', '#607d8b', '#7092be', '#c3c3c3'];
var CL_INPUT_COLOR = 'va-b';
var S = {
  ROOT: {
    paddingTop: 6,
    paddingBottom: 4
  },
  ROW2: {
    paddingTop: 4
  },
  ROW2_PADDING: {
    paddingLeft: 56
  },
  BT_COUNTER: {
    marginLeft: 14,
    marginRight: 16
  },
  TO_CELL: {
    marginLeft: 12,
    marginRight: 12
  },
  CELL: {
    marginRight: 4
  }
};

var _initColor = function _initColor(props) {
  return props.initColor || C_TRANSPARENT;
};

var _hasLineWidth = function _hasLineWidth(chartType) {
  var _ref = chartType || {},
      value = _ref.value;

  if (!value || value === 'SPLINE' || value === 'LINE') {
    return true;
  }

  return false;
};

var SeriaColor = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(SeriaColor, _Component);

  function SeriaColor(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._hReset = function () {
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
        return i < _max ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_CellColor["default"], {
          className: CL_INPUT_COLOR,
          style: S.CELL,
          color: c,
          onClick: _this._hClick
        }, c) : null;
      }).filter(Boolean);
    };

    _this._refLineWidth = /*#__PURE__*/(0, _react.createRef)();
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
    var _this$props = this.props,
        isLong = _this$props.isLong,
        chartType = _this$props.chartType,
        color = this.state.color,
        _isLineWidth = _hasLineWidth(chartType),
        _rowStyle = _isLineWidth ? S.ROW2 : (0, _extends2["default"])({}, S.ROW2, S.ROW2_PADDING);

    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S.ROOT,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_CellColor["default"], {
          color: color,
          className: CL_INPUT_COLOR,
          style: S.TO_CELL,
          onClick: this._hReset
        }), this._renderColors(COLORS1, isLong)]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: _rowStyle,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BtCounter["default"], {
          ref: this._refLineWidth,
          isShow: _isLineWidth,
          style: S.BT_COUNTER,
          title: "Line Width"
        }), this._renderColors(COLORS2, isLong)]
      })]
    });
  };

  _proto.getConf = function getConf() {
    var _this$_refLineWidth$c;

    var chartType = this.props.chartType,
        color = this.state.color;
    return {
      seriaColor: color !== C_TRANSPARENT ? color : void 0,
      seriaWidth: _hasLineWidth(chartType) ? (_this$_refLineWidth$c = this._refLineWidth.current) == null ? void 0 : _this$_refLineWidth$c.getValue() : void 0
    };
  };

  return SeriaColor;
}(_react.Component);

var _default = SeriaColor;
exports["default"] = _default;
//# sourceMappingURL=SeriaColor.js.map