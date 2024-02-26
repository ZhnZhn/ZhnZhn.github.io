"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useRefInit = _interopRequireDefault(require("../hooks/useRefInit"));
const useChartMethods = (getChart, onZoom, onCopy, onPasteTo) => (0, _useRefInit.default)(() => ({
  onClick2H: () => getChart().zhToggle2H(),
  onMinMax: () => getChart().zhToggleMinMaxLines(),
  onZoomChart: () => {
    if ((0, _uiApi.isFn)(onZoom)) {
      onZoom({
        chart: getChart()
      });
    }
  },
  onCopyChart: () => onCopy(getChart()),
  onPasteToChart: () => onPasteTo(getChart())
}));
var _default = exports.default = useChartMethods;
//# sourceMappingURL=useChartMethods.js.map