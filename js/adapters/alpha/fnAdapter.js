"use strict";

exports.__esModule = true;
exports.default = void 0;

var _AdapterFn = require("../AdapterFn");

var _compareByFn = require("../compareByFn");

var _crFn = require("../crFn");

var _legendFn = require("../legendFn");

const _crItemConf = (_ref, option) => {
  let {
    data
  } = _ref;
  const {
    _itemKey,
    dfFn,
    dfSubId,
    items,
    dataSource
  } = option;
  return dfFn === 'TIME_SERIES_DAILY' ? {
    _itemKey,
    ...(0, _crFn.crItemConf)(option),
    ...(0, _crFn.crValueConf)(data),
    items: [...(items || [])],
    dfSubId,
    dfFn,
    dataSource
  } : void 0;
};

const _crZhConfig = (config, option) => {
  const {
    _itemKey,
    itemCaption
  } = option,
        {
    id,
    dataSource
  } = config,
        _id = _itemKey || id,
        itemConf = _crItemConf(config, option);

  return {
    id: _id,
    key: _id,
    itemCaption,
    itemConf,
    legend: (0, _legendFn.stockSeriesLegend)(),
    dataSource: dataSource || "Alpha Vantage"
  };
};

const fnAdapter = {
  crError: _crFn.crError,
  getValue: _AdapterFn.getValue,
  getCaption: _AdapterFn.getCaption,
  joinBy: _AdapterFn.joinBy,
  valueMoving: _AdapterFn.valueMoving,
  ymdToUTC: _AdapterFn.ymdToUTC,
  compareByDate: _compareByFn.compareByDate,
  roundBy: _AdapterFn.roundBy,
  crIntradayConfigOption: (config, option) => ({
    zhConfig: _crZhConfig(config, option),
    valueMoving: (0, _AdapterFn.valueMoving)(config.data)
  })
};
var _default = fnAdapter;
exports.default = _default;
//# sourceMappingURL=fnAdapter.js.map