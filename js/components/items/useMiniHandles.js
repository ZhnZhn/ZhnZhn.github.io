"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

const useMiniHandles = getMainChart => {
  /*eslint-disable react-hooks/exhaustive-deps */
  const _hLoadedMiniChart = (0, _react.useCallback)(miniChart => {
    const mainChart = getMainChart();

    if (mainChart) {
      mainChart.zhAddDetailChart(miniChart);
    }
  }, []) // getMainChart
  ,
        _hUnLoadedMiniChart = (0, _react.useCallback)(miniChart => {
    const mainChart = getMainChart();

    if (mainChart) {
      mainChart.zhRemoveDetailChart(miniChart);
    }
  }, []); // getMainChart

  /*eslint-enable react-hooks/exhaustive-deps */


  return [_hLoadedMiniChart, _hUnLoadedMiniChart];
};

var _default = useMiniHandles;
exports.default = _default;
//# sourceMappingURL=useMiniHandles.js.map