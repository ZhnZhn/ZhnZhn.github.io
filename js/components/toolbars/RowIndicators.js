"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.RowIndicators = void 0;
var _useModalMenuIndicators = _interopRequireDefault(require("./useModalMenuIndicators"));
var _jsxRuntime = require("react/jsx-runtime");
const RowIndicators = _ref => {
  let {
    config,
    getChart,
    onAddMfi,
    onRemoveMfi
  } = _ref;
  const indicatorConfigs = (0, _useModalMenuIndicators.default)(config, onAddMfi, onRemoveMfi);
  return indicatorConfigs.map(_ref2 => {
    let [RowComp, key, props] = _ref2;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(RowComp, {
      ...props,
      getChart: getChart
    }, key);
  });
};
exports.RowIndicators = RowIndicators;
//# sourceMappingURL=RowIndicators.js.map