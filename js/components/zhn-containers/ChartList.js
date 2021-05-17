"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _ItemFactory = _interopRequireDefault(require("../factories/ItemFactory"));

var ChartList = function ChartList(_ref) {
  var refChartFn = _ref.refChartFn,
      configs = _ref.configs,
      store = _ref.store,
      chartType = _ref.chartType,
      browserType = _ref.browserType,
      isAdminMode = _ref.isAdminMode,
      _onCloseItem = _ref.onCloseItem;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    children: (configs || []).map(function (config, index) {
      var zhConfig = config.zhConfig,
          _ref2 = zhConfig || {},
          id = _ref2.id,
          zhCompType = _ref2.zhCompType;

      return _ItemFactory["default"].crItem({
        store: store,
        config: config,
        index: index,
        chartType: chartType,
        props: {
          isAdminMode: isAdminMode,
          ref: zhCompType ? void 0 : refChartFn.bind(null, index),
          onCloseItem: function onCloseItem() {
            return _onCloseItem(chartType, browserType, id);
          }
        }
      });
    })
  });
};

var _default = ChartList;
exports["default"] = _default;
//# sourceMappingURL=ChartList.js.map