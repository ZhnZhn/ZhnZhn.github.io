"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _pipe = _interopRequireDefault(require("../utils/pipe"));
var _stockBuilderFn = require("../charts/stockBuilderFn");
var _configBuilderFn = require("../charts/configBuilderFn");
var _AdapterFn = require("./AdapterFn");
var _legendFn = require("./legendFn");
var _AdapterStockFn = require("./AdapterStockFn");
const _crCaptionDf = _ref => {
  let {
    title,
    subtitle
  } = _ref;
  return {
    title,
    subtitle
  };
};
const crAdapterOHLCV = _ref2 => {
  let {
    isAth,
    crCaption = _crCaptionDf,
    getArr = _AdapterFn.FN_IDENTITY,
    crAddConfig = _AdapterFn.FN_NOOP
  } = _ref2;
  return {
    toConfig(json, option) {
      const {
          isNotZoomToMinMax,
          isDrawDeltaExtrems,
          seriaType,
          //seriaColor,
          seriaWidth
        } = option,
        {
          title,
          subtitle
        } = crCaption(option, json),
        id = (0, _AdapterFn.crDfItemKey)(option),
        dataOption = (0, _AdapterStockFn.toStockSeriesData)({
          isAth,
          arr: getArr(json, option)
        }),
        {
          dC,
          dMfi
        } = dataOption;
      return {
        config: (0, _pipe.default)((0, _stockBuilderFn.crStockConfig)(id, Object.assign({}, dataOption, {
          isNotZoomToMinMax,
          isDrawDeltaExtrems,
          seriaType,
          //seriaColor,
          seriaWidth
        })), (0, _configBuilderFn.fAddCaption)(title, subtitle), (0, _configBuilderFn.fAdd)(crAddConfig({
          json,
          option,
          data: dC,
          id,
          title,
          subtitle
        })), (0, _configBuilderFn.fAddZhPoints)(dMfi), (0, _configBuilderFn.fAdd)('zhConfig', {
          legend: (0, _legendFn.stockSeriesLegend)()
        }), _configBuilderFn.toConfig)
      };
    },
    toSeries(json, option) {
      const id = (0, _AdapterFn.crDfItemKey)(option),
        {
          dC
        } = (0, _AdapterStockFn.toStockSeriesData)({
          isAllSeries: false,
          arr: getArr(json, option)
        });
      return (0, _stockBuilderFn.crStockSeriaConfig)(id, dC);
    }
  };
};
var _default = exports.default = crAdapterOHLCV;
//# sourceMappingURL=crAdapterOHLCV.js.map