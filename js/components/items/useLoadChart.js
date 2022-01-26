"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

const useLoadChart = () => {
  const _refChart = (0, _react.useRef)(),
        onLoaded = (0, _react.useCallback)(chart => _refChart.current = chart, []),
        getChart = (0, _react.useCallback)(() => _refChart.current, []);

  return [onLoaded, getChart];
};

var _default = useLoadChart;
exports.default = _default;
//# sourceMappingURL=useLoadChart.js.map