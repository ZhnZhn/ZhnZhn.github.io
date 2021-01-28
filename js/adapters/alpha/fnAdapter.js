"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var getValue = _AdapterFn["default"].getValue,
    getCaption = _AdapterFn["default"].getCaption,
    crItemConf = _AdapterFn["default"].crItemConf,
    crValueConf = _AdapterFn["default"].crValueConf,
    stockSeriesLegend = _AdapterFn["default"].stockSeriesLegend,
    valueMoving = _AdapterFn["default"].valueMoving,
    ymdToUTC = _AdapterFn["default"].ymdToUTC,
    compareByDate = _AdapterFn["default"].compareByDate,
    roundBy = _AdapterFn["default"].roundBy;

var _crItemConf = function _crItemConf(_ref, option) {
  var data = _ref.data;
  var _itemKey = option._itemKey,
      dfFn = option.dfFn,
      dfT = option.dfT,
      dfSubId = option.dfSubId,
      items = option.items,
      dataSource = option.dataSource;
  return dfFn === 'TIME_SERIES_DAILY' ? (0, _extends2["default"])({
    _itemKey: _itemKey
  }, crItemConf(option), crValueConf(data), {
    items: [].concat(items),
    dfT: dfT,
    dfSubId: dfSubId,
    dfFn: dfFn,
    dataSource: dataSource
  }) : void 0;
};

var _crZhConfig = function _crZhConfig(config, option) {
  var _itemKey = option._itemKey,
      itemCaption = option.itemCaption,
      id = config.id,
      dataSource = config.dataSource,
      _id = _itemKey || id,
      itemConf = _crItemConf(config, option);

  return {
    id: _id,
    key: _id,
    itemCaption: itemCaption,
    itemConf: itemConf,
    legend: stockSeriesLegend(),
    dataSource: dataSource || "Alpha Vantage"
  };
};

var fnAdapter = {
  getValue: getValue,
  getCaption: getCaption,
  valueMoving: valueMoving,
  ymdToUTC: ymdToUTC,
  compareByDate: compareByDate,
  roundBy: roundBy,
  crIntradayConfigOption: function crIntradayConfigOption(config, option) {
    return {
      zhConfig: _crZhConfig(config, option),
      valueMoving: valueMoving(config.data)
    };
  }
};
var _default = fnAdapter;
exports["default"] = _default;
//# sourceMappingURL=fnAdapter.js.map