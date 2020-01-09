"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _IntradayFns = _interopRequireDefault(require("../IntradayFns"));

var stockSeriesLegend = _AdapterFn["default"].stockSeriesLegend,
    valueMoving = _AdapterFn["default"].valueMoving;
var crSeriesData = _IntradayFns["default"].crSeriesData,
    crDataVm = _IntradayFns["default"].crDataVm;

var _crZhConfig = function _crZhConfig(id, dataSource) {
  return {
    id: id,
    key: id,
    isWithoutAdd: true,
    legend: stockSeriesLegend(),
    dataSource: dataSource
  };
};

var _crIntradayConfigOption = function _crIntradayConfigOption(_ref) {
  var id = _ref.id,
      data = _ref.data,
      dataSource = _ref.dataSource;
  return {
    zhConfig: _crZhConfig(id, dataSource),
    valueMoving: valueMoving(data)
  };
};

var WtdIntraday = {
  crKey: function crKey(option) {
    var value = option.value,
        two = option.two;
    return value + " (" + two + "min)";
  },
  toConfig: function toConfig(json, option) {
    var _itemId = option._itemId,
        dataSource = option.dataSource,
        _crSeriesData = crSeriesData(json.intraday, option, _itemId),
        data = _crSeriesData.data,
        dH = _crSeriesData.dH,
        dL = _crSeriesData.dL,
        dO = _crSeriesData.dO,
        minClose = _crSeriesData.minClose,
        maxClose = _crSeriesData.maxClose,
        dColumn = _crSeriesData.dColumn,
        dVolume = _crSeriesData.dVolume,
        _dataVm = crDataVm(data),
        config = (0, _ConfigBuilder["default"])().intradayConfig({
      id: _itemId,
      data: data,
      dH: dH,
      dL: dL,
      dO: dO,
      minClose: minClose,
      maxClose: maxClose,
      dVolume: dVolume,
      dColumn: dColumn
    }).addCaption(_itemId).add(_crIntradayConfigOption({
      id: _itemId,
      data: _dataVm,
      dataSource: dataSource
    })).toConfig();

    return {
      config: config
    };
  }
};
var _default = WtdIntraday;
exports["default"] = _default;
//# sourceMappingURL=WtdIntraday.js.map