"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _interopRequireWildcard2 = _interopRequireDefault(require("@babel/runtime/helpers/interopRequireWildcard"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _highcharts = _interopRequireDefault(require("highcharts"));

var S = {
  DIV: {
    position: 'relative',
    zIndex: 1
  },
  SHOW: {
    display: 'block'
  },
  HIDE: {
    display: 'none'
  }
};
var MSG_OFFLINE = 'It seems you are offline';

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _isAreaRangeRequired = function _isAreaRangeRequired(config) {
  var series = config.series,
      _ref = (series || [])[0] || {},
      type = _ref.type;

  return type === 'arearange' && !_highcharts["default"].seriesTypes.arearange;
};

var _loadHighchartsMore = function _loadHighchartsMore() {
  /*eslint-disable no-undef */
  if (process.env.NODE_ENV === '_development') {
    return Promise.resolve().then(function () {
      return (0, _interopRequireWildcard2["default"])(require("lib-dev/highcharts-more.js"));
    });
    /*eslint-enable no-undef */
  }

  return Promise.resolve().then(function () {
    return (0, _interopRequireWildcard2["default"])(require("highcharts/highcharts-more"));
  });
};

var HighchartWrapper = function HighchartWrapper(_ref2) {
  var _ref2$isShow = _ref2.isShow,
      isShow = _ref2$isShow === void 0 ? true : _ref2$isShow,
      _ref2$isShowAbs = _ref2.isShowAbs,
      isShowAbs = _ref2$isShowAbs === void 0 ? true : _ref2$isShowAbs,
      _ref2$absComp = _ref2.absComp,
      absComp = _ref2$absComp === void 0 ? null : _ref2$absComp,
      style = _ref2.style,
      config = _ref2.config,
      onLoaded = _ref2.onLoaded,
      onWillUnLoaded = _ref2.onWillUnLoaded;

  var _refChartNode = (0, _react.useRef)(),
      _refChart = (0, _react.useRef)();
  /*eslint-disable react-hooks/exhaustive-deps */


  (0, _react.useEffect)(function () {
    if (!config) {
      throw new Error("Chart's config must be specified.");
    }

    var _crChart = function _crChart() {
      _refChart.current = new _highcharts["default"].Chart(_refChartNode.current, config);
      var current = _refChart.current;

      if (current && _isFn(onLoaded)) {
        onLoaded(current);
      }
    };

    if (_isAreaRangeRequired(config)) {
      _loadHighchartsMore().then(function (module) {
        return module["default"](_highcharts["default"]);
      }).then(_crChart)["catch"](function (err) {
        return console.log(MSG_OFFLINE);
      });
    } else {
      _crChart();
    }

    return function () {
      var current = _refChart.current;

      if (_isFn(onWillUnLoaded)) {
        onWillUnLoaded(current);
      }

      if (current) {
        current.destroy();
        _refChart.current = null;
      }
    };
  }, []);
  /*eslint-enable react-hooks/exhaustive-deps */

  var _style = isShow ? S.SHOW : S.HIDE;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: (0, _extends2["default"])({}, style, S.DIV, _style),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      ref: _refChartNode
    }), isShowAbs && absComp]
  });
};

var _default = HighchartWrapper;
exports["default"] = _default;
//# sourceMappingURL=HighchartWrapper.js.map