"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var crChartId = _fnAdapter["default"].crChartId,
    crConfigOption = _fnAdapter["default"].crConfigOption,
    toSeriesData = _fnAdapter["default"].toSeriesData,
    crOpenInterest = _fnAdapter["default"].crOpenInterest,
    joinBy = _fnAdapter["default"].joinBy;

var _getValue = function _getValue(obj) {
  return obj && obj.value || '';
};

var _getCaption = function _getCaption(obj) {
  return obj && obj.caption || '';
};

var _crDfKey = function _crDfKey(option) {
  option.linkFn = "NASDAQ";
  return option.value;
};

var _crFtKey = function _crFtKey(option) {
  var _option$items = option.items,
      items = _option$items === void 0 ? [] : _option$items,
      it1 = items[0],
      it2 = items[1],
      it3 = items[2];
  option.linkFn = "BR";
  option.subtitle = joinBy(' ', _getCaption(it2), _getCaption(it3));
  return option.value = joinBy('', _getValue(it1), _getValue(it2), _getValue(it3));
};

var _rCrKey = {
  DF: _crDfKey,
  FT: _crFtKey
};
var BarchartAdapter = {
  crKey: function crKey(option) {
    var dfT = option.dfT,
        _crKey = _rCrKey[dfT] || _rCrKey.DF;

    return _crKey(option);
  },
  toConfig: function toConfig(json, option) {
    var chartId = crChartId(option),
        _option$title = option.title,
        title = _option$title === void 0 ? '' : _option$title,
        _option$subtitle = option.subtitle,
        subtitle = _option$subtitle === void 0 ? '' : _option$subtitle,
        dataOption = toSeriesData({
      arr: json.results,
      seriaOption: {
        pnDate: 'tradingDay'
      },
      option: option
    }),
        data = dataOption.data,
        dataMfi = dataOption.dataMfi,
        dataInterest = crOpenInterest(json, option),
        config = (0, _ConfigBuilder["default"])().stockConfig(chartId, dataOption).addCaption(title, subtitle).add((0, _extends2["default"])({}, crConfigOption({
      chartId: chartId,
      option: option,
      data: data
    }))).addZhPoints(dataMfi).addMiniVolume({
      btTitle: 'OpenInterest',
      title: 'OpenInterest',
      dVolume: dataInterest,
      dColumn: dataInterest
    }).toConfig();
    return {
      config: config
    };
  },
  toSeries: function toSeries(json, option) {
    if (json === void 0) {
      json = {};
    }

    var parentId = option.parentId,
        _id = parentId + "_" + crChartId(option),
        _toSeriesData = toSeriesData({
      arr: json.results,
      seriaOption: {
        isAllSeries: false,
        pnDate: 'tradingDay'
      },
      option: option
    }),
        data = _toSeriesData.data;

    return (0, _ConfigBuilder["default"])().stockSeria(_id, data).toSeria();
  }
};
var _default = BarchartAdapter;
exports["default"] = _default;
//# sourceMappingURL=BarchartAdapter.js.map