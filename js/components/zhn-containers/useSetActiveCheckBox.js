"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
/*eslint-disable react-hooks/exhaustive-deps */
const useSetActiveCheckBox = (chartType, browserType, onSetActive) => (0, _uiApi.useMemo)(() => [checkBox => {
  checkBox.chartType = chartType;
  checkBox.browserType = browserType;
  onSetActive(true, checkBox);
}, checkBox => {
  checkBox.chartType = chartType;
  checkBox.browserType = browserType;
  onSetActive(false, checkBox);
}], []);
// chartType, browserType, onSetActive
/*eslint-enable react-hooks/exhaustive-deps */
var _default = useSetActiveCheckBox;
exports.default = _default;
//# sourceMappingURL=useSetActiveCheckBox.js.map