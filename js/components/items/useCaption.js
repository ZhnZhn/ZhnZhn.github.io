"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
//[isCaption, showCaption, hideCaption]
const useCaption = (getMainChart, toggleToolbar) => {
  const [isCaption, setIsCaption] = (0, _uiApi.useState)(true);
  return [isCaption, /*eslint-disable react-hooks/exhaustive-deps */
  ...(0, _uiApi.useMemo)(() => [() => {
    const _mainChart = getMainChart();
    if (_mainChart) {
      _mainChart.zhShowCaption();
      setIsCaption(true);
      toggleToolbar(true);
    }
  }, () => {
    const _mainChart = getMainChart();
    if (_mainChart) {
      _mainChart.zhHideCaption();
      setIsCaption(false);
      toggleToolbar(false);
    }
  }], [])
  // getMainChart, toggleToolbar
  /*eslint-enable react-hooks/exhaustive-deps */];
};
var _default = exports.default = useCaption;
//# sourceMappingURL=useCaption.js.map