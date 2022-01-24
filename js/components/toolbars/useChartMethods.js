"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _useRefInit = _interopRequireDefault(require("../hooks/useRefInit"));

const _isFn = fn => typeof fn === 'function';

const useChartMethods = (getChart, onZoom, onCopy, onPasteTo) => (0, _useRefInit.default)(() => ({
  onClick2H: () => getChart().zhToggle2H(),
  onMinMax: () => getChart().zhToggleMinMaxLines(),
  onZoomChart: () => {
    if (_isFn(onZoom)) {
      onZoom({
        chart: getChart()
      });
    }
  },
  onCopyChart: () => onCopy(getChart()),
  onPasteToChart: () => onPasteTo(getChart())
}));

var _default = useChartMethods;
exports.default = _default;
//# sourceMappingURL=useChartMethods.js.map