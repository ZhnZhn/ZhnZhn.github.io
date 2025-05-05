"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _highcharts = _interopRequireDefault(require("highcharts"));
var _isTypeFn = require("../../utils/isTypeFn");
var _uiApi = require("../uiApi");
var _jsxRuntime = require("react/jsx-runtime");
const S_DIV = {
  position: 'relative',
  zIndex: 1
};
const HighchartWrapper = _ref => {
  let {
    isShowAbs = true,
    absComp = null,
    config,
    onLoaded,
    onWillUnLoaded
  } = _ref;
  const _refChartElement = (0, _uiApi.useRef)();

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useLayoutEffect)(() => {
    if (!config) {
      throw new Error("Chart's config must be specified.");
    }
    const _chartInstance = new _highcharts.default.Chart(_refChartElement.current, config);
    if (_chartInstance && (0, _isTypeFn.isFn)(onLoaded)) {
      onLoaded(_chartInstance);
    }
    return () => {
      if ((0, _isTypeFn.isFn)(onWillUnLoaded)) {
        onWillUnLoaded(_chartInstance);
      }
      if (_chartInstance) {
        _chartInstance.destroy();
      }
    };
  }, []);
  /*eslint-enable react-hooks/exhaustive-deps */

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S_DIV,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      ref: _refChartElement
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_uiApi.IfTrue, {
      v: isShowAbs,
      children: absComp
    })]
  });
};
var _default = exports.default = HighchartWrapper;
//# sourceMappingURL=HighchartWrapper.js.map