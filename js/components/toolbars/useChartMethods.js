"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useRefInit = _interopRequireDefault(require("../hooks/useRefInit"));
var _ComponentActions = require("../../flux/actions/ComponentActions");
const useChartMethods = (getChart, onZoom, onCopy, onPasteTo) => (0, _useRefInit.default)(() => ({
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