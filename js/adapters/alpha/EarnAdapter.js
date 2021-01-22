"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var ymdToUTC = _fnAdapter["default"].ymdToUTC,
    compareByDate = _fnAdapter["default"].compareByDate,
    roundBy = _fnAdapter["default"].roundBy,
    _isNan = Number.isNaN;

var crData = function crData(json, option) {
  var dfPeriod = option.dfPeriod,
      _pnReport = dfPeriod === 'A' ? 'annualEarnings' : 'quarterlyEarnings',
      _reports = json[_pnReport] || [],
      _data = [];

  _reports.forEach(function (_ref) {
    var reportedEPS = _ref.reportedEPS,
        fiscalDateEnding = _ref.fiscalDateEnding;

    var _y = roundBy(reportedEPS);

    if (!_isNan(_y)) {
      _data.push([ymdToUTC(fiscalDateEnding), _y]);
    }
  });

  return _data.sort(compareByDate);
};

var _adapter;

var EarnAdapter = function EarnAdapter() {
  return _adapter || (_adapter = (0, _crAdapterType["default"])({
    crData: crData
  }));
};

var _default = EarnAdapter;
exports["default"] = _default;
//# sourceMappingURL=EarnAdapter.js.map