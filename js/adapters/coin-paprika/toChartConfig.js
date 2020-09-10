"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _crConfigType = _interopRequireDefault(require("../../charts/crConfigType1"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var Builder = _crConfigType["default"].Builder,
    getValue = _fnAdapter["default"].getValue,
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
    option.subtitle = SUBTITLE;

    var _crData = crData(json),
        data = _crData.data,
        dVolume = _crData.dVolume,
        dColumn = _crData.dColumn,
        dMarketCap = _crData.dMarketCap,
        confOption = crConfigOption(option),
        config = Builder((0, _crConfigType["default"])({
      option: option,
      data: data,
      confOption: confOption
    })).addMiniVolume({
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
    return Builder.crSeria({
      adapter: toChartConfig,
      json: json,
      option: option
    });
  }
};
var _default = toChartConfig;
exports["default"] = _default;
//# sourceMappingURL=toChartConfig.js.map