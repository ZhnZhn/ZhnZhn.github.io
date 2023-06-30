"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));
var _fnAdapter = require("./fnAdapter");
const _crData = (0, _fnAdapter.fCrData)('reportedEPS', 'fiscalDateEnding', 'round');
const crData = (json, option) => {
  const {
      dfPeriod
    } = option,
    _pnReport = dfPeriod === 'A' ? 'annualEarnings' : 'quarterlyEarnings';
  return _crData(json[_pnReport]);
};
let _adapter;
const EarnAdapter = () => _adapter || (_adapter = (0, _crAdapterType.default)({
  crData
}));
var _default = EarnAdapter;
exports.default = _default;
//# sourceMappingURL=EarnAdapter.js.map