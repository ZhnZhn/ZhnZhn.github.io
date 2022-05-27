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

  const _pnReport = dfPeriod === 'A' ? 'annualReports' : 'quarterlyReports';

  return (json[_pnReport] || []).reduce((arr, item) => {
    const _y = parseInt(item[dfItem], 10);

    if (!(0, _fnAdapter._isNaN)(_y)) {
      arr.push([(0, _fnAdapter.ymdToUTC)(item.fiscalDateEnding), _y]);
    }

    return arr;
  }, []).sort(_fnAdapter.compareByDate);
};

let _adapter;

const FundAdapter = () => _adapter || (_adapter = (0, _crAdapterType.default)({
  crData
}));

var _default = FundAdapter;
exports.default = _default;
//# sourceMappingURL=FundAdapter.js.map