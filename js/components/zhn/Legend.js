"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _LegendItem = _interopRequireDefault(require("./LegendItem"));

var C = {
  CL_SCROLL: "with-scroll",
  MORE_MAX: 12,
  MORE: 'MORE',
  LESS: 'LESS'
};
var S = {
  ROOT_MORE: {
    overflowY: 'auto',
    height: 250,
    marginLeft: -8,
    paddingRight: 4,
    transform: 'scaleX(-1)'
  },
  ROOT_LESS: {
    height: 'auto'
  },
  DIV: {
    transform: 'scaleX(-1)'
  },
  BT_MORE: {
    display: 'inline-block',
    marginTop: 10,
    marginLeft: 8,
    color: '#1b2836',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};

var BtMore = function BtMore(_ref) {
  var isMore = _ref.isMore,
      legend = _ref.legend,
      onClick = _ref.onClick;
  var _len = legend.length;

  if (_len > C.MORE_MAX) {
    var _caption = isMore ? C.LESS + ': ' + C.MORE_MAX : C.MORE + ': +' + (_len - C.MORE_MAX);

    return _react["default"].createElement("button", {
      style: S.BT_MORE,
      onClick: onClick
    }, _caption);
  } else {
    return null;
  }
};

var Legend =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(Legend, _Component);

  function Legend() {
    var _this;

    for (var _len2 = arguments.length, args = new Array(_len2), _key = 0; _key < _len2; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      isMore: false
    };

    _this._handleMore = function () {
      _this.setState(function (prevState) {
        return {
          isMore: !prevState.isMore
        };
      });
    };

    _this._renderLegend = function (legend, isMore, onClickItem) {
      var _legend = [],
          max = legend.length;
      var i = 0;

      for (; i < max; i++) {
        if (isMore || !isMore && i < C.MORE_MAX) {
          var item = legend[i];

          _legend.push(_react["default"].createElement(_LegendItem["default"], {
            key: item.name,
            item: item,
            onClickItem: onClickItem
          }));
        } else {
          break;
        }
      }

      return _legend;
    };

    return _this;
  }

  var _proto = Legend.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.legend === this.props.legend && nextState.isMore === this.state.isMore) {
      return false;
    }

    return true;
  };

  _proto.render = function render() {
    var _this$props = this.props,
        legend = _this$props.legend,
        onClickItem = _this$props.onClickItem,
        isMore = this.state.isMore,
        _rootStyle = isMore ? S.ROOT_MORE : (0, _extends2["default"])({}, S.ROOT_MORE, {}, S.ROOT_LESS);

    return _react["default"].createElement("div", {
      className: C.CL_SCROLL,
      style: _rootStyle
    }, _react["default"].createElement("div", {
      style: S.DIV
    }, this._renderLegend(legend, isMore, onClickItem), _react["default"].createElement(BtMore, {
      isMore: isMore,
      legend: legend,
      onClick: this._handleMore
    })));
  };

  return Legend;
}(_react.Component);

Legend.defaultProps = {
  legend: []
};
var _default = Legend;
exports["default"] = _default;
//# sourceMappingURL=Legend.js.map