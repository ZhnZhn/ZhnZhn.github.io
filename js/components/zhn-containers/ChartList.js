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
    children: (0, _uiApi.safeMap)(configs, (config, index) => {
      const {
          zhConfig,
          zhCompType
        } = config,
        {
          id
        } = zhConfig || {},
        _refChartFn = zhCompType ? void 0 : (0, _uiApi.bindTo)(refChartFn, id);
      return (0, _ItemFactory.crItem)({
        config,
        index,
        chartType,
        props: {
          isAdminMode,
          refEl: _refChartFn,
          onCloseItem: () => {
            onCloseItem(chartType, browserType, id);
            if (_refChartFn) {
              _refChartFn();
            }
          }
        }
      });
    })
  });
};
var _default = exports.default = ChartList;
//# sourceMappingURL=ChartList.js.map