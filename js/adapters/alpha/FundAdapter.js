"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crConfigType = _interopRequireDefault(require("../../charts/crConfigType1"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var Builder = _crConfigType["default"].Builder,
    ymdToUTC = _fnAdapter["default"].ymdToUTC,
    compareByDate = _fnAdapter["default"].compareByDate,
    _isNan = Number.isNaN || isNaN;

var _crData = function _crData(json, option) {
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

var _crZhConfig = function _crZhConfig(_ref) {
  var _itemKey = _ref._itemKey,
      itemCaption = _ref.itemCaption,
      dataSource = _ref.dataSource;
  return {
    id: _itemKey,
    key: _itemKey,
    itemCaption: itemCaption,
    dataSource: dataSource
  };
};

var _crConfigOption = function _crConfigOption(option) {
  return {
    //valueMoving: valueMoving(data),
    zhConfig: _crZhConfig(option)
  };
};

var FundAdapter = {
  crKey: function crKey(option) {
    return option._itemKey;
  },
  toConfig: function toConfig(json, option) {
    var data = _crData(json, option),
        confOption = _crConfigOption(option);

    return {
      config: (0, _crConfigType["default"])({
        option: option,
        data: data,
        confOption: confOption
      })
    };
  },
  toSeries: function toSeries(json, option) {
    return Builder.crSeria({
      adapter: FundAdapter,
      json: json,
      option: option,
      type: 'spline'
    });
  }
};
var _default = FundAdapter;
exports["default"] = _default;
//# sourceMappingURL=FundAdapter.js.map