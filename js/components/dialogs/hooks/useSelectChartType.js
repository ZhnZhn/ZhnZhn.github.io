"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../../uiApi");
var _useToggle = require("../../hooks/useToggle");
var _ChartOptionsFn = require("../ChartOptionsFn");
const useSelectChartType = () => {
  const [isShowFd, toggleIsShowFd] = (0, _useToggle.useToggle)(),
    [chartType, setChartType] = (0, _uiApi.useState)()
    /*eslint-disable react-hooks/exhaustive-deps */,
    hSelectChartType = (0, _uiApi.useCallback)(chartType => {
      setChartType(chartType);
      if ((0, _ChartOptionsFn.isCategoryItem)(chartType)) {
        toggleIsShowFd(false);
      }
    }, []);
  // toggleIsShowFd
  /*eslint-enable react-hooks/exhaustive-deps */
  return [isShowFd, toggleIsShowFd, chartType, hSelectChartType];
};
var _default = exports.default = useSelectChartType;
//# sourceMappingURL=useSelectChartType.js.map