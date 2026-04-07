"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AvFn = require("../av/AvFn");
var _crAdapterType = require("../crAdapterType1");
const _crData = (0, _AvFn.fCrData)('reportedEPS', 'fiscalDateEnding', 'round');
const crData = (json, option) => {
  const {
      dfPeriod
    } = option,
    _pnReport = dfPeriod === 'A' ? 'annualEarnings' : 'quarterlyEarnings';
  return _crData(json[_pnReport]);
};
let _adapter;
const EarnAdapter = () => _adapter || (_adapter = (0, _crAdapterType.crAdapterType1)({
  crData
}));
var _default = exports.default = EarnAdapter;
//# sourceMappingURL=EarnAdapter.js.map