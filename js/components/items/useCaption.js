"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

const useCaption = (getMainChart, toggleToolbar) => {
  const [isCaption, setIsCapion] = (0, _react.useState)(true)
  /*eslint-disable react-hooks/exhaustive-deps */
  ,
        hideCaption = (0, _react.useCallback)(() => {
    const _mainChart = getMainChart();

    if (_mainChart) {
      _mainChart.zhHideCaption();

      setIsCapion(false);
      toggleToolbar(false);
    }
  }, []) // getMainChart, toggleToolbar
  ,
        showCaption = (0, _react.useCallback)(() => {
    const _mainChart = getMainChart();

    if (_mainChart) {
      _mainChart.zhShowCaption();

      setIsCapion(true);
      toggleToolbar(true);
    }
  }, []); // getMainChart, toggleToolbar

  /*eslint-enable react-hooks/exhaustive-deps */

  return [isCaption, showCaption, hideCaption];
};

var _default = useCaption;
exports.default = _default;
//# sourceMappingURL=useCaption.js.map