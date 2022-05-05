"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

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
      } = dataOption,
            config = (0, _ConfigBuilder.default)().stockConfig(id, dataOption).addCaption(title, subtitle).add({
        valueMoving: (0, _AdapterFn.valueMoving)(dC),
        ...crAddConfig({
          json,
          option,
          data: dC,
          id,
          title,
          subtitle
        })
      }).add('zhConfig', {
        legend: (0, _legendFn.stockSeriesLegend)()
      }).addZhPointsIf(dMfi).toConfig();
      return {
        config
      };
    },

    toSeries(json, option) {
      const id = crId(option),
            {
        data
      } = (0, _AdapterStockFn.toStockSeriesData)({
        arr: getArr(json, option),
        toDate,
        seriaOption: { ...seriaOption,
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