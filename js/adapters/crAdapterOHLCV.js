"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _pipe = _interopRequireDefault(require("../utils/pipe"));
var _stockBuilderFn = require("../charts/stockBuilderFn");
var _configBuilderFn = require("../charts/configBuilderFn");
var _ConfigBuilder = _interopRequireDefault(require("../charts/ConfigBuilder"));
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
  },
  _crIdDf = _ref2 => {
    let {
      _itemKey
    } = _ref2;
    return _itemKey;
  },
  _getArrDf = json => json,
  _crAddConfigDf = () => {};
const crAdapterOHLCV = _ref3 => {
  let {
    seriaOption = {},
    crCaption = _crCaptionDf,
    crId = _crIdDf,
    getArr = _getArrDf,
    crAddConfig = _crAddConfigDf,
    toDate
  } = _ref3;
  return {
    toConfig(json, option) {
      const {
          title,
          subtitle
        } = crCaption(option, json),
        id = crId(option),
        dataOption = (0, _AdapterStockFn.toStockSeriesData)({
          arr: getArr(json, option),
          toDate,
          seriaOption,
          option
        }),
        {
          dC,
          dMfi
        } = dataOption;
      return {
        config: (0, _pipe.default)((0, _stockBuilderFn.crStockConfig)(id, dataOption), (0, _configBuilderFn.fAddCaption)(title, subtitle), (0, _configBuilderFn.fAdd)({
          valueMoving: (0, _AdapterFn.valueMoving)(dC),
          ...crAddConfig({
            json,
            option,
            data: dC,
            id,
            title,
            subtitle
          }),
          zhPoints: dMfi,
          zhIsMfi: true
        }), (0, _configBuilderFn.fAdd)('zhConfig', {
          legend: (0, _legendFn.stockSeriesLegend)()
        }), _configBuilderFn.toConfig)
      };
    },
    toSeries(json, option) {
      const id = crId(option),
        {
          data
        } = (0, _AdapterStockFn.toStockSeriesData)({
          arr: getArr(json, option),
          toDate,
          seriaOption: {
            ...seriaOption,
            isAllSeries: false
          },
          option
        });
      return (0, _ConfigBuilder.default)().stockSeria(id, data).toSeria();
    }
  };
};
var _default = crAdapterOHLCV;
exports.default = _default;
//# sourceMappingURL=crAdapterOHLCV.js.map