"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));

var _fnAdapter = require("./fnAdapter");

const crData = (json, option) => {
  const {
    dfPeriod
  } = option,
        _pnReport = dfPeriod === 'A' ? 'annualEarnings' : 'quarterlyEarnings',
        _reports = json[_pnReport] || [],
        _data = [];

  _reports.forEach(_ref => {
    let {
      reportedEPS,
      fiscalDateEnding
    } = _ref;

    const _y = (0, _fnAdapter.roundBy)(reportedEPS);

    if (!(0, _fnAdapter._isNaN)(_y)) {
      _data.push([(0, _fnAdapter.ymdToUTC)(fiscalDateEnding), _y]);
    }
  });

  return _data.sort(_fnAdapter.compareByDate);
};

let _adapter;

const EarnAdapter = () => _adapter || (_adapter = (0, _crAdapterType.default)({
  crData
}));

var _default = EarnAdapter;
exports.default = _default;
//# sourceMappingURL=EarnAdapter.js.map