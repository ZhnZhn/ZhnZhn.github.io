"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));
var _fnAdapter = require("./fnAdapter");
const crData = (json, _ref) => {
  let {
    dfItem,
    dfPeriod
  } = _ref;
  return (0, _fnAdapter.fCrData)(dfItem, 'fiscalDateEnding', '10')(json[dfPeriod === 'A' ? 'annualReports' : 'quarterlyReports']);
};
let _adapter;
const FundAdapter = () => _adapter || (_adapter = (0, _crAdapterType.default)({
  crData
}));
var _default = FundAdapter;
exports.default = _default;
//# sourceMappingURL=FundAdapter.js.map