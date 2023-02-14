"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _RowTaType = _interopRequireDefault(require("./RowTaType1"));
var _jsxRuntime = require("react/jsx-runtime");
const fRowTaType1 = (caption, crInitialPeriod, addTaTo) => _ref => {
  let {
    config,
    getChart
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RowTaType.default, {
    caption: caption,
    config: config,
    getChart: getChart,
    crInitialPeriod: crInitialPeriod,
    addTaTo: addTaTo
  });
};
var _default = fRowTaType1;
exports.default = _default;
//# sourceMappingURL=fRowTaType1.js.map