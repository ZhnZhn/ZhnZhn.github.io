"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var ymdToUTC = _fnAdapter["default"].ymdToUTC,
    compareByDate = _fnAdapter["default"].compareByDate,
    valueMoving = _fnAdapter["default"].valueMoving;

var _isNan = Number.isNaN || isNaN;

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

var crConfigOption = function crConfigOption(_ref2) {
  var option = _ref2.option,
      data = _ref2.data;
  return {
    valueMoving: valueMoving(data),
    zhConfig: _crZhConfig(option)
  };
};

var FundAdapter = {
  toConfig: function toConfig(json, option) {
    var seriaType = option.seriaType,
        seriaColor = option.seriaColor,
        seriaWidth = option.seriaWidth,
        title = option.title,
        subtitle = option.subtitle,
        data = crData(json, option),
        seria = (0, _ConfigBuilder["default"])().splineSeria({
      seriaType: seriaType,
      seriaColor: seriaColor,
      seriaWidth: seriaWidth,
      data: data
    }).toSeria(),
        config = (0, _ConfigBuilder["default"])().area2Config(title, subtitle).addSeries(seria).addMinMax(data, option).add((0, _extends2["default"])({}, crConfigOption({
      option: option,
      data: data
    }))).toConfig();
    return {
      config: config
    };
  },
  toSeries: function toSeries(json, option) {
    return _ConfigBuilder["default"].crSeria({
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