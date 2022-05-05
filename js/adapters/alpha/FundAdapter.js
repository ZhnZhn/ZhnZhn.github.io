"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));

var _fnAdapter = require("./fnAdapter");

const crData = (json, option) => {
  const {
    dfItem,
    dfPeriod
  } = option,
        _pnReport = dfPeriod === 'A' ? 'annualReports' : 'quarterlyReports',
        _reports = json[_pnReport] || [],
        _data = [];

  _reports.forEach(item => {
    const _y = parseInt(item[dfItem], 10);

    if (!(0, _fnAdapter._isNaN)(_y)) {
      _data.push([(0, _fnAdapter.ymdToUTC)(item.fiscalDateEnding), _y]);
    }
  });

  return _data.sort(_fnAdapter.compareByDate);
};

let _adapter;

const FundAdapter = () => _adapter || (_adapter = (0, _crAdapterType.default)({
  crData
}));

var _default = FundAdapter;
exports.default = _default;
//# sourceMappingURL=FundAdapter.js.map