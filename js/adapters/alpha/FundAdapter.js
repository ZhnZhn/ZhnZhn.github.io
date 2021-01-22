"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var ymdToUTC = _fnAdapter["default"].ymdToUTC,
    compareByDate = _fnAdapter["default"].compareByDate,
    _isNan = Number.isNaN;

var crData = function crData(json, option) {
  var dfItem = option.dfItem,
      dfPeriod = option.dfPeriod,
      _pnReport = dfPeriod === 'A' ? 'annualReports' : 'quarterlyReports',
      _reports = json[_pnReport] || [],
      _data = [];

  _reports.forEach(function (item) {
    var _y = parseInt(item[dfItem], 10);

    if (!_isNan(_y)) {
      _data.push([ymdToUTC(item.fiscalDateEnding), _y]);
    }
  });

  return _data.sort(compareByDate);
};

var _adapter;

var FundAdapter = function FundAdapter() {
  return _adapter || (_adapter = (0, _crAdapterType["default"])({
    crData: crData
  }));
};

var _default = FundAdapter;
exports["default"] = _default;
//# sourceMappingURL=FundAdapter.js.map