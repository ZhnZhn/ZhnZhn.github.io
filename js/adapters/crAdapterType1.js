"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.fCrDataType1 = exports.fCrConfOptionExchangeRate = exports.crAdapterType1 = void 0;
var _crConfigType = _interopRequireDefault(require("../charts/crConfigType1"));
var _configBuilderFn = require("../charts/configBuilderFn");
var _AdapterFn = require("./AdapterFn");
const _crZhConfig = _ref => {
    let {
      _itemKey,
      itemCaption,
      dataSource
    } = _ref;
    return {
      id: _itemKey,
      key: _itemKey,
      itemCaption,
      dataSource
    };
  },
  crConfOptionDf = option => ({
    zhConfig: _crZhConfig(option)
  });
const _crItemCaptionCurrencyRate = (option, toCurrency) => {
  const _caption = option.items[0].c,
    _fromIndex = _caption.indexOf('(');
  return `${_caption.slice(_fromIndex + 1, _fromIndex + 4)}/${toCurrency}`;
};
const fCrConfOptionExchangeRate = function (toCurrency, exchangeRateCaseId) {
  if (exchangeRateCaseId === void 0) {
    exchangeRateCaseId = "EXR";
  }
  return option => {
    if (option.dfCase === exchangeRateCaseId) {
      option.itemCaption = _crItemCaptionCurrencyRate(option, toCurrency);
    }
    return crConfOptionDf(option);
  };
};
exports.fCrConfOptionExchangeRate = fCrConfOptionExchangeRate;
const fCrDataType1 = (getItems, fCrItemTuple) => (json, options) => {
  const _crItemTuple = fCrItemTuple(options);
  return getItems(json).reduce((data, item) => {
    const p = (0, _AdapterFn.isObj)(item) ? _crItemTuple(item) : void 0;
    if (p && (0, _AdapterFn.isNumber)(p[0]) && (0, _AdapterFn.isNumber)(p[1])) {
      data.push(p);
    }
    return data;
  }, []);
};
exports.fCrDataType1 = fCrDataType1;
const crAdapterType1 = _ref2 => {
  let {
    crKey = _AdapterFn.crDfItemKey,
    crData,
    crConfOption = crConfOptionDf,
    addConfOption = _AdapterFn.FN_NOOP,
    trOption = _AdapterFn.FN_NOOP,
    addToConfig = _AdapterFn.FN_IDENTITY
  } = _ref2;
  const adapter = {
    crKey,
    toConfig(json, option) {
      const _data = crData(json, option),
        data = (0, _AdapterFn.isArr)(_data) ? _data : (_data || {}).data,
        confOption = (0, _AdapterFn.assign)(crConfOption(option, json, _data), addConfOption(option, json));
      trOption(option, json);
      return {
        config: addToConfig((0, _crConfigType.default)({
          option,
          data,
          confOption
        }), json, option, _data)
      };
    },
    toSeries(json, option) {
      return (0, _configBuilderFn.crSeriaConfigFromAdapter)({
        adapter,
        json,
        option,
        type: 'spline'
      });
    }
  };
  return adapter;
};
exports.crAdapterType1 = crAdapterType1;
//# sourceMappingURL=crAdapterType1.js.map