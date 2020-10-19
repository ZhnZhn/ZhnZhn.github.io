"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

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

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var HighchartWrapper = function HighchartWrapper(_ref) {
  var _ref$isShow = _ref.isShow,
      isShow = _ref$isShow === void 0 ? true : _ref$isShow,
      _ref$isShowAbs = _ref.isShowAbs,
      isShowAbs = _ref$isShowAbs === void 0 ? true : _ref$isShowAbs,
      _ref$absComp = _ref.absComp,
      absComp = _ref$absComp === void 0 ? null : _ref$absComp,
      style = _ref.style,
      config = _ref.config,
      onLoaded = _ref.onLoaded,
      onWillUnLoaded = _ref.onWillUnLoaded;

  var _refChartNode = (0, _react.useRef)(),
      _refChart = (0, _react.useRef)();
  /*eslint-disable react-hooks/exhaustive-deps */


  (0, _react.useEffect)(function () {
    if (!config) {
      throw new Error("Chart's config must be specified.");
    }

    _refChart.current = new _highcharts["default"]['Chart'](_refChartNode.current, config);
    var current = _refChart.current;

    if (current && _isFn(onLoaded)) {
      onLoaded(current);
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