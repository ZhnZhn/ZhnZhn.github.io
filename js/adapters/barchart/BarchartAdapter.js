"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var crTitle = _fnAdapter["default"].crTitle,
    crChartId = _fnAdapter["default"].crChartId,
    crData = _fnAdapter["default"].crData,
    crConfigOption = _fnAdapter["default"].crConfigOption,
    toSeriesData = _fnAdapter["default"].toSeriesData;
var BarchartAdapter = {
  toConfig: function toConfig(json, option) {
    var chartId = crChartId(option),
        _crTitle = crTitle(option),
        title = _crTitle.title,
        subtitle = _crTitle.subtitle,
        dataOption = crData(json, option),
        data = dataOption.data,
        dataMfi = dataOption.dataMfi,
        config = (0, _ConfigBuilder["default"])().stockConfig(chartId, dataOption).addCaption(title, subtitle).add((0, _extends2["default"])({}, crConfigOption({
      chartId: chartId,
      option: option,
      data: data
    }))).addZhPoints(dataMfi).toConfig();

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
        _toSeriesData = toSeriesData(json.results, {
      isAllSeries: false,
      pnDate: 'tradingDay'
    }),
        data = _toSeriesData.data;

    return (0, _ConfigBuilder["default"])().initSeria().addPoints(_id, data).toSeria();
  }
};
var _default = BarchartAdapter;
exports["default"] = _default;
//# sourceMappingURL=BarchartAdapter.js.map