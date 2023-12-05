"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _ItemFactory = require("../factories/ItemFactory");
var _jsxRuntime = require("react/jsx-runtime");
const ChartList = _ref => {
  let {
    refChartFn,
    configs,
    chartType,
    browserType,
    isAdminMode,
    onCloseItem
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    children: (configs || []).map((config, index) => {
      const {
          zhConfig,
          zhCompType
        } = config,
        {
          id
        } = zhConfig || {};
      return (0, _ItemFactory.crItem)({
        config,
        index,
        chartType,
        props: {
          isAdminMode,
          ref: zhCompType ? void 0 : (0, _uiApi.bindTo)(refChartFn, index),
          onCloseItem: () => onCloseItem(chartType, browserType, id)
        }
      });
    })
  });
};
var _default = exports.default = ChartList;
//# sourceMappingURL=ChartList.js.map