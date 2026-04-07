"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AvFn = require("../av/AvFn");
var _crAdapterType = require("../crAdapterType1");
const crData = (json, _ref) => {
  let {
    dfItem,
    dfPeriod
  } = _ref;
  return (0, _AvFn.fCrData)(dfItem, 'fiscalDateEnding', '10')(json[dfPeriod === 'A' ? 'annualReports' : 'quarterlyReports']);
};
let _adapter;
const FundAdapter = () => _adapter || (_adapter = (0, _crAdapterType.crAdapterType1)({
  crData
}));
var _default = exports.default = FundAdapter;
//# sourceMappingURL=FundAdapter.js.map