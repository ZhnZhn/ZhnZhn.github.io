"use strict";

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

//_hLoadedMiniChart, _hUnLoadedMiniChart

/*eslint-disable react-hooks/exhaustive-deps */
const useMiniHandles = getMainChart => (0, _uiApi.useMemo)(() => [miniChart => {
  const mainChart = getMainChart();

  if (mainChart) {
    mainChart.zhAddDetailChart(miniChart);
  }
}, miniChart => {
  const mainChart = getMainChart();

  if (mainChart) {
    mainChart.zhRemoveDetailChart(miniChart);
  }
}], []); // getMainChart

/*eslint-enable react-hooks/exhaustive-deps */


var _default = useMiniHandles;
exports.default = _default;
//# sourceMappingURL=useMiniHandles.js.map