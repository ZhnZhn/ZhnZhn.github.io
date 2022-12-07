"use strict";

exports.__esModule = true;
exports.default = void 0;

var _uiApi = require("../uiApi");

/*eslint-disable react-hooks/exhaustive-deps */
//onCheck, onUnCheck
const useSetCheckBox = (getMainChart, chartType, onSetActive) => (0, _uiApi.useMemo)(() => [checkBox => {
  checkBox.chartType = chartType;
  onSetActive(true, checkBox, getMainChart());
}, checkBox => {
  checkBox.chartType = chartType;
  onSetActive(false, checkBox, getMainChart());
}], []); // chartType, onSetActive, getMainChart

/*eslint-enable react-hooks/exhaustive-deps */


var _default = useSetCheckBox;
exports.default = _default;
//# sourceMappingURL=useSetCheckBox.js.map