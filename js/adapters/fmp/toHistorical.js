"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _AdapterStockFn = _interopRequireDefault(require("../AdapterStockFn"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var toSeriesData = _AdapterStockFn["default"].toSeriesData;
var crCaption = _fnAdapter["default"].crCaption,
    crConfigOption = _fnAdapter["default"].crConfigOption;

var _getData = function _getData(json, option) {
  var dfPn = option.dfPn;
  return json[dfPn].reverse();
};

var toChart = {
  toConfig: function toConfig(json, option) {
    var _itemKey = option._itemKey,
        _crCaption = crCaption(option),
        title = _crCaption.title,
        subtitle = _crCaption.subtitle,
        dataOption = toSeriesData({
      arr: _getData(json, option),
      option: option
    }),
        data = dataOption.data,
        dataMfi = dataOption.dataMfi,
        config = (0, _ConfigBuilder["default"])().stockConfig(_itemKey, dataOption).addCaption(title, subtitle).add((0, _extends2["default"])({}, crConfigOption({
      json: json,
      option: option,
      data: data
    }))).addZhPoints(dataMfi).toConfig();

    return {
      config: config
    };
  },
  toSeries: function toSeries(json, option) {
    var _itemKey = option._itemKey,
        _toSeriesData = toSeriesData({
      arr: _getData(json, option),
      seriaOption: {
        isAllSeries: false
      },
      option: option
    }),
        data = _toSeriesData.data;

    return (0, _ConfigBuilder["default"])().stockSeria(_itemKey, data).toSeria();
  }
};
var _default = toChart;
exports["default"] = _default;
//# sourceMappingURL=toHistorical.js.map