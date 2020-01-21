"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));

var _Sparklines = require("../zhn-sparklines/Sparklines");

//import PropTypes from 'prop-types'
var COLOR_MAX = "#8bc34a";
var COLOR_MIN = "#f44336";
var COLOR_EQUAL = 'black';
var SPOT_COLORS = {
  '-1': COLOR_MIN,
  '0': COLOR_EQUAL,
  '1': COLOR_MAX
};
var S = {
  CAPTION: {
    position: 'relative',
    opacity: 0.7,
    lineHeight: 1.8,
    padding: '3px',
    marginBottom: '5px'
  },
  CAPTION_BT: {
    position: 'absolute',
    top: '4px',
    right: '8px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  ITEM_ROOT: {
    padding: '3px',
    cursor: 'pointer'
  },
  ITEM_TITLE: {
    display: 'inline-block',
    width: '30px'
  },
  ITEM_VALUE: {
    display: 'inline-block',
    "float": 'right'
  }
};

var Caption = function Caption(_ref) {
  var color = _ref.color,
      from = _ref.from,
      to = _ref.to,
      onClick = _ref.onClick;
  return _react["default"].createElement("p", {
    style: (0, _extends2["default"])({}, S.CAPTION, {}, {
      background: color
    })
  }, _react["default"].createElement("span", null, from, "\xA0\u2013\xA0", to), _react["default"].createElement("span", {
    style: S.CAPTION_BT,
    onClick: onClick
  }, "*"));
};

var Item = function Item(_ref2) {
  var title = _ref2.title,
      value = _ref2.value,
      onClick = _ref2.onClick;
  return _react["default"].createElement("p", {
    style: S.ITEM_ROOT,
    onClick: onClick
  }, _react["default"].createElement("span", {
    style: S.ITEM_TITLE
  }, title), _react["default"].createElement("span", {
    style: S.ITEM_VALUE
  }, value));
};

var ClusterItem =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(ClusterItem, _Component);

  /*
  static propTypes = {
    point: PropTypes.shape({
      0: PropTypes.number,
      id: PropTypes.string,
      seria: PropTypes.shape({
        data: PropTypes.array
      })
    }),
    color: PropTypes.string,
    index: PropTypes.number,
    isShowRange: PropTypes.bool
  }
  */
  function ClusterItem(props) {
    var _this;

    _this = _Component.call(this) || this;

    _this._handleClickItem = function () {
      _this.setState(function (prevState) {
        return {
          isShowChart: !prevState.isShowChart
        };
      });
    };

    _this.data = props.point.seria.data;
    _this.pointIndex = _this.data.length - 1;
    _this.state = {
      isShowChart: props.index < 3 ? true : false
    };
    return _this;
  }

  var _proto = ClusterItem.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        point = _this$props.point,
        color = _this$props.color,
        isShowRange = _this$props.isShowRange,
        isShowChart = this.state.isShowChart,
        _maxLabel = isShowRange ? _react["default"].createElement(_Sparklines.SparklinesMaxLabel, {
      color: COLOR_MAX,
      fontSize: 14
    }) : _react["default"].createElement("span", null),
        _minLabel = isShowRange ? _react["default"].createElement(_Sparklines.SparklinesMinLabel, {
      color: COLOR_MIN,
      fontSize: 14
    }) : _react["default"].createElement("span", null);

    return _react["default"].createElement("div", null, _react["default"].createElement(Item, {
      title: point.id,
      value: point[0],
      onClick: this._handleClickItem
    }), _react["default"].createElement(_ShowHide["default"], {
      isShow: isShowChart
    }, _react["default"].createElement(_Sparklines.Sparklines, {
      height: 32,
      width: 140,
      svgHeight: 32,
      svgWidth: 140,
      data: this.data,
      margin: 3 //marginLeft={20}

    }, _maxLabel, _minLabel, _react["default"].createElement(_Sparklines.SparklinesLine, {
      color: color
    }), _react["default"].createElement(_Sparklines.SparklinesSpot, {
      pointIndex: this.pointIndex,
      size: 3,
      spotColors: SPOT_COLORS
    }))));
  };

  return ClusterItem;
}(_react.Component);

var Cluster = function Cluster(_ref3) {
  var cluster = _ref3.cluster,
      color = _ref3.color,
      isShowRange = _ref3.isShowRange;
  var points = cluster.points || [];
  return _react["default"].createElement("div", null, points.map(function (point, index) {
    return _react["default"].createElement(ClusterItem, (0, _extends2["default"])({
      key: point.id
    }, {
      point: point,
      color: color,
      index: index,
      isShowRange: isShowRange
    }));
  }));
};
/*
Cluster.propTypes = {
  cluster: PropTypes.shape({
    points: PropTypes.arrayOf(
        PropTypes.shape({
           id: PropTypes.string
    }))
  }),
  color: PropTypes.string
}
*/


var ClusterInfo =
/*#__PURE__*/
function (_Component2) {
  (0, _inheritsLoose2["default"])(ClusterInfo, _Component2);

  function ClusterInfo(props) {
    var _this2;

    _this2 = _Component2.call(this) || this;

    _this2._handleToggleRange = function () {
      _this2.setState(function (prevState) {
        return {
          isShowRange: !prevState.isShowRange
        };
      });
    };

    _this2.state = {
      isShowRange: false
    };
    return _this2;
  }

  var _proto2 = ClusterInfo.prototype;

  _proto2.render = function render() {
    var _this$props2 = this.props,
        cluster = _this$props2.cluster,
        color = _this$props2.color,
        from = _this$props2.from,
        to = _this$props2.to,
        isShowRange = this.state.isShowRange;
    return _react["default"].createElement("div", null, _react["default"].createElement(Caption, {
      color: color,
      from: from,
      to: to,
      onClick: this._handleToggleRange
    }), _react["default"].createElement(Cluster, {
      cluster: cluster,
      color: color,
      isShowRange: isShowRange
    }));
  };

  return ClusterInfo;
}(_react.Component);
/*
ClusterInfo.propTypes = {
  cluster: PropTypes.object,
  color: PropTypes.string,
  from: PropTypes.string,
  to: PropTypes.string
}
*/


var _default = ClusterInfo;
exports["default"] = _default;
//# sourceMappingURL=ClusterInfo.js.map