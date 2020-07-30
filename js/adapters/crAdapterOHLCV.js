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

var _crCaptionDf = function _crCaptionDf(_ref) {
  var title = _ref.title,
      subtitle = _ref.subtitle;
  return {
    title: title,
    subtitle: subtitle
  };
},
    _crIdDf = function _crIdDf(_ref2) {
  var _itemKey = _ref2._itemKey;
  return _itemKey;
},
    _getArrDf = function _getArrDf(json) {
  return json;
},
    _crAddConfigDf = function _crAddConfigDf() {};

var crAdapterOHLCV = function crAdapterOHLCV(_ref3) {
  var _ref3$seriaOption = _ref3.seriaOption,
      seriaOption = _ref3$seriaOption === void 0 ? {} : _ref3$seriaOption,
      _ref3$crCaption = _ref3.crCaption,
      crCaption = _ref3$crCaption === void 0 ? _crCaptionDf : _ref3$crCaption,
      _ref3$crId = _ref3.crId,
      crId = _ref3$crId === void 0 ? _crIdDf : _ref3$crId,
      _ref3$getArr = _ref3.getArr,
      getArr = _ref3$getArr === void 0 ? _getArrDf : _ref3$getArr,
      _ref3$crAddConfig = _ref3.crAddConfig,
      crAddConfig = _ref3$crAddConfig === void 0 ? _crAddConfigDf : _ref3$crAddConfig,
      toDate = _ref3.toDate;
  return {
    toConfig: function toConfig(json, option) {
      var _crCaption = crCaption(option),
          title = _crCaption.title,
          subtitle = _crCaption.subtitle,
          id = crId(option),
          dataOption = toSeriesData({
        arr: getArr(json, option),
        toDate: toDate,
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
        toDate: toDate,
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

var _default = crAdapterOHLCV;
exports["default"] = _default;
//# sourceMappingURL=crAdapterOHLCV.js.map