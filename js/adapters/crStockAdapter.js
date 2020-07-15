"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ConfigBuilder = _interopRequireDefault(require("../charts/ConfigBuilder"));

var _AdapterFn = _interopRequireDefault(require("./AdapterFn"));

var _AdapterStockFn = _interopRequireDefault(require("./AdapterStockFn"));

var valueMoving = _AdapterFn["default"].valueMoving,
    stockSeriesLegend = _AdapterFn["default"].stockSeriesLegend;
var toSeriesData = _AdapterStockFn["default"].toSeriesData;

var crStockAdapter = function crStockAdapter(_ref) {
  var _ref$seriaOption = _ref.seriaOption,
      seriaOption = _ref$seriaOption === void 0 ? {} : _ref$seriaOption,
      crCaption = _ref.crCaption,
      crId = _ref.crId,
      getArr = _ref.getArr,
      crAddConfig = _ref.crAddConfig;
  return {
    toConfig: function toConfig(json, option) {
      var _crCaption = crCaption(option),
          title = _crCaption.title,
          subtitle = _crCaption.subtitle,
          id = crId(option),
          dataOption = toSeriesData({
        arr: getArr(json, option),
        seriaOption: seriaOption,
        option: option
      }),
          data = dataOption.data,
          dataMfi = dataOption.dataMfi,
          config = (0, _ConfigBuilder["default"])().stockConfig(id, dataOption).addCaption(title, subtitle).add((0, _extends2["default"])({
        valueMoving: valueMoving(data)
      }, crAddConfig({
        json: json,
        option: option,
        data: data,
        id: id,
        title: title,
        subtitle: subtitle
      }))).add('zhConfig', {
        legend: stockSeriesLegend()
      }).addZhPoints(dataMfi).toConfig();

      return {
        config: config
      };
    },
    toSeries: function toSeries(json, option) {
      var id = crId(option),
          _toSeriesData = toSeriesData({
        arr: getArr(json, option),
        seriaOption: (0, _extends2["default"])({}, seriaOption, {
          isAllSeries: false
        }),
        option: option
      }),
          data = _toSeriesData.data;

      return (0, _ConfigBuilder["default"])().stockSeria(id, data).toSeria();
    }
  };
};

var _default = crStockAdapter;
exports["default"] = _default;
//# sourceMappingURL=crStockAdapter.js.map