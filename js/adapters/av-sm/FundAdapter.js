"use strict";

exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = require("../crAdapterType1");
var _fnAdapter = require("./fnAdapter");
const crData = (json, _ref) => {
  let {
    dfItem,
    dfPeriod
  } = _ref;
  return (0, _fnAdapter.fCrData)(dfItem, 'fiscalDateEnding', '10')(json[dfPeriod === 'A' ? 'annualReports' : 'quarterlyReports']);
};
let _adapter;
const FundAdapter = () => _adapter || (_adapter = (0, _crAdapterType.crAdapterType1)({
  crData
}));
var _default = exports.default = FundAdapter;
//# sourceMappingURL=FundAdapter.js.map