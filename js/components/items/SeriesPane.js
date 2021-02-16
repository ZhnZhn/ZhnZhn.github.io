"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _ScrollPane = _interopRequireDefault(require("../zhn/ScrollPane"));

var _SeriaRow = _interopRequireDefault(require("./SeriaRow"));

var CL = {
  ELL: 'ellipsis'
};
var S = {
  ROOT_DIV: {
    paddingTop: 8
  },
  TITLE: {
    paddingBottom: 4,
    marginLeft: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    borderBottom: '2px solid black'
  },
  CHART_ID: {
    width: 200,
    verticalAlign: 'bottom',
    color: 'rgb(164, 135, 212)'
  }
};
/*
const DF_FROM_CHART = {
  userOptions: {
    zhConfig: {
      id: 'id'
    }
  },
  series: []
};
*/

var _crYAxisOption = function _crYAxisOption(toChart) {
  var options = [{
    caption: 'withYAxis',
    value: -1
  }];
  toChart.yAxis.forEach(function (yAxis, index) {
    options.push({
      caption: "toYAxis" + (index + 1),
      value: index
    });
  });
  return options;
};

var SeriesPane = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(SeriesPane, _Component);

  function SeriesPane() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.compSeries = [];

    _this._regSeriaRow = function (comp) {
      var compIndex = comp.props.compIndex;
      _this.compSeries[compIndex] = comp;
    };

    _this._unregSeriaRow = function (comp) {
      var compIndex = comp.props.compIndex;
      _this.compSeries[compIndex] = null;
    };

    _this._renderSeries = function (chartId, series, options) {
      return series.filter(function (seria) {
        return seria.visible;
      }).map(function (seria, index) {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SeriaRow["default"], {
          seria: seria,
          compIndex: index,
          yAxisOptions: options,
          onReg: _this._regSeriaRow,
          onUnReg: _this._unregSeriaRow
        }, chartId + index);
      });
    };

    return _this;
  }

  var _proto = SeriesPane.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        style = _this$props.style,
        toChart = _this$props.toChart,
        _this$props$fromChart = _this$props.fromChart,
        fromChart = _this$props$fromChart === void 0 ? {} : _this$props$fromChart,
        _yAxisOption = _crYAxisOption(toChart),
        _fromChart$userOption = fromChart.userOptions,
        userOptions = _fromChart$userOption === void 0 ? {} : _fromChart$userOption,
        _fromChart$series = fromChart.series,
        series = _fromChart$series === void 0 ? [] : _fromChart$series,
        _userOptions$zhConfig = userOptions.zhConfig,
        zhConfig = _userOptions$zhConfig === void 0 ? {} : _userOptions$zhConfig,
        _zhConfig$id = zhConfig.id,
        chartId = _zhConfig$id === void 0 ? 'id' : _zhConfig$id;

    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ScrollPane["default"], {
      style: style,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        style: S.ROOT_DIV,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          style: S.TITLE,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            children: "From Chart:\xA0"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: CL.ELL,
            style: S.CHART_ID,
            children: chartId
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          children: this._renderSeries(chartId, series, _yAxisOption)
        })]
      })
    });
  };

  _proto.getValues = function getValues() {
    var _this$props$fromChart2 = this.props.fromChart,
        fromChart = _this$props$fromChart2 === void 0 ? {} : _this$props$fromChart2,
        _ref = fromChart.xAxis && fromChart.xAxis[0].getExtremes() || {},
        dataMin = _ref.dataMin,
        dataMax = _ref.dataMax,
        userMin = _ref.userMin,
        userMax = _ref.userMax;

    return this.compSeries.filter(function (comp) {
      return comp !== null;
    }).map(function (comp) {
      return comp.getValue();
    }).filter(function (config) {
      return config.isChecked;
    }).map(function (config) {
      config.userMin = userMin || dataMin;
      config.userMax = userMax || dataMax;
      return config;
    });
  };

  return SeriesPane;
}(_react.Component);

var _default = SeriesPane;
exports["default"] = _default;
//# sourceMappingURL=SeriesPane.js.map