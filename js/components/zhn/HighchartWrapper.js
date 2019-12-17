"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _highcharts = _interopRequireDefault(require("highcharts"));

var S = {
  SHOW: {
    position: 'relative',
    display: 'block',
    zIndex: 1
  },
  HIDE: {
    position: 'relative',
    display: 'none'
  }
};

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var HighchartWrapper =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(HighchartWrapper, _Component);

  function HighchartWrapper(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this._renderChart = function (config) {
      if (!config) {
        throw new Error('Config must be specified for the ZhHighchart');
      }

      _this.chart = new _highcharts["default"]['Chart'](_this._refChart.current, config);
    };

    _this._refChart = _react["default"].createRef();
    return _this;
  }

  var _proto = HighchartWrapper.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this$props = this.props,
        config = _this$props.config,
        onLoaded = _this$props.onLoaded;

    this._renderChart(config);

    if (this.chart && _isFn(onLoaded)) {
      onLoaded(this.chart);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    try {
      var onWillUnLoaded = this.props.onWillUnLoaded;

      if (_isFn(onWillUnLoaded)) {
        onWillUnLoaded(this.chart);
      }

      this.chart.destroy();
      this.chart = null;
    } catch (err) {
      /*eslint-disable no-undef */
      if (process.env.NODE_ENV === '_development') {
        console.log('Exception during destroy chart');
        console.log(err);
      }
      /*eslint-enable no-undef */

    }
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        isShow = _this$props2.isShow,
        rootStyle = _this$props2.rootStyle,
        isShowAbs = _this$props2.isShowAbs,
        absComp = _this$props2.absComp,
        _rootDivStyle = isShow ? S.SHOW : S.HIDE;

    return _react["default"].createElement("div", {
      style: (0, _extends2["default"])({}, rootStyle, {}, _rootDivStyle)
    }, _react["default"].createElement("div", {
      ref: this._refChart
    }), isShowAbs && absComp);
  };

  _proto.getChart = function getChart() {
    if (!this.chart) {
      throw new Error('getChart() should not called before the ZhHighchart component is mounted');
    }

    return this.chart;
  };

  return HighchartWrapper;
}(_react.Component);

HighchartWrapper.defaultProps = {
  isShowAbs: true
};
var _default = HighchartWrapper;
exports["default"] = _default;
//# sourceMappingURL=HighchartWrapper.js.map