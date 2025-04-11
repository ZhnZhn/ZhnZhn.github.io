"use strict";

exports.__esModule = true;
exports.default = void 0;
var _ComponentActions = require("../../flux/actions/ComponentActions");
var _uiApi = require("../uiApi");
var _useProperty = require("../hooks/useProperty");
const useChartMethods = (getChart, onZoom, onCopy, onPasteTo) => (0, _useProperty.useRefInit)(() => ({
  onExport: () => {
    (0, _ComponentActions.showCustomizeExport)({
      chart: getChart()
    });
  },
  onFullScreen: () => getChart().fullscreen.open(),
  onPrint: () => getChart().print(),
  onX2H: () => getChart().zhToggle2H(),
  onMinMax: () => getChart().zhToggleMinMaxLines(),
  onZoom: () => {
    if ((0, _uiApi.isFn)(onZoom)) {
      onZoom({
        chart: getChart()
      });
    }
  },
  onCopy: () => onCopy(getChart()),
  onPasteTo: () => onPasteTo(getChart())
}));
var _default = exports.default = useChartMethods;
//# sourceMappingURL=useChartMethods.js.map