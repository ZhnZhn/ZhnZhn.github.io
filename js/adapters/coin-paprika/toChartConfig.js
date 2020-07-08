"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var getValue = _fnAdapter["default"].getValue,
    crData = _fnAdapter["default"].crData,
    crConfigOption = _fnAdapter["default"].crConfigOption;
var SUBTITLE = 'Values on 23:59:59 UTC';
var toChartConfig = {
  crKey: function crKey(option) {
    var _option$items = option.items,
        items = _option$items === void 0 ? [] : _option$items,
        fromDate = option.fromDate;
    return option._itemKey = getValue(items[0]) + "_" + fromDate;
  },
  toConfig: function toConfig(json, option) {
    var seriaType = option.seriaType,
        seriaColor = option.seriaColor,
        seriaWidth = option.seriaWidth,
        title = option.title,
        _crData = crData(json),
        data = _crData.data,
        dVolume = _crData.dVolume,
        dColumn = _crData.dColumn,
        dMarketCap = _crData.dMarketCap,
        seria = (0, _ConfigBuilder["default"])().splineSeria({
      seriaType: seriaType,
      seriaColor: seriaColor,
      seriaWidth: seriaWidth,
      data: data
    }).toSeria(),
        config = (0, _ConfigBuilder["default"])().area2Config(title, SUBTITLE).addSeries(seria).addMinMax(data, option).add((0, _extends2["default"])({}, crConfigOption({
      json: json,
      option: option,
      data: data
    }))).addMiniVolume({
      btTitle: 'Volume',
      title: 'Volume USD',
      dVolume: dVolume,
      dColumn: dColumn
    }).addMiniVolume({
      btTitle: 'Market Cap',
      title: 'Market Cap USD',
      dVolume: dMarketCap
    }).toConfig();

    return {
      config: config
    };
  },
  toSeries: function toSeries(json, option) {
    return _ConfigBuilder["default"].crSeria({
      adapter: toChartConfig,
      json: json,
      option: option
    });
  }
};
var _default = toChartConfig;
exports["default"] = _default;
//# sourceMappingURL=toChartConfig.js.map