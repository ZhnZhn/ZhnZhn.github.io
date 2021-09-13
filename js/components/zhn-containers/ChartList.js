"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _ItemFactory = _interopRequireDefault(require("../factories/ItemFactory"));

var _jsxRuntime = require("react/jsx-runtime");

const ChartList = ({
  refChartFn,
  configs,
  store,
  chartType,
  browserType,
  isAdminMode,
  onCloseItem
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
  children: (configs || []).map((config, index) => {
    const {
      zhConfig,
      zhCompType
    } = config,
          {
      id
    } = zhConfig || {};
    return _ItemFactory.default.crItem({
      store,
      config,
      index,
      chartType,
      props: {
        isAdminMode,
        ref: zhCompType ? void 0 : refChartFn.bind(null, index),
        onCloseItem: () => onCloseItem(chartType, browserType, id)
      }
    });
  })
});

var _default = ChartList;
exports.default = _default;
//# sourceMappingURL=ChartList.js.map