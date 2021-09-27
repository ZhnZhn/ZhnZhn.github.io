"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _highcharts = _interopRequireDefault(require("highcharts"));

var _jsxRuntime = require("react/jsx-runtime");

const S_DIV = {
  position: 'relative',
  zIndex: 1
};

const _isFn = fn => typeof fn === 'function';

const HighchartWrapper = ({
  isShowAbs = true,
  absComp = null,
  config,
  onLoaded,
  onWillUnLoaded
}) => {
  const _refChartNode = (0, _react.useRef)(),
        _refChart = (0, _react.useRef)();
  /*eslint-disable react-hooks/exhaustive-deps */


  (0, _react.useEffect)(() => {
    if (!config) {
      throw new Error("Chart's config must be specified.");
    }

    _refChart.current = new _highcharts.default.Chart(_refChartNode.current, config);
    const {
      current
    } = _refChart;

    if (current && _isFn(onLoaded)) {
      onLoaded(current);
    }

    return () => {
      const {
        current
      } = _refChart;

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

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S_DIV,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      ref: _refChartNode
    }), isShowAbs && absComp]
  });
};

var _default = HighchartWrapper;
exports.default = _default;
//# sourceMappingURL=HighchartWrapper.js.map