"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

const useSetCheckBox = (getMainChart, chartType, onSetActive) => {
  /*eslint-disable react-hooks/exhaustive-deps */
  const onCheck = (0, _react.useCallback)(checkBox => {
    checkBox.chartType = chartType;
    onSetActive(true, checkBox, getMainChart());
  }, []),
        onUnCheck = (0, _react.useCallback)(checkBox => {
    checkBox.chartType = chartType;
    onSetActive(false, checkBox, getMainChart());
  }, []); // chartType, onSetActive, getMainChart

  /*eslint-enable react-hooks/exhaustive-deps */

  return [onCheck, onUnCheck];
};

var _default = useSetCheckBox;
exports.default = _default;
//# sourceMappingURL=useSetCheckBox.js.map