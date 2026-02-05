"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.fToKline = exports.crOptionsFromStr = void 0;
var _isTypeFn = require("../utils/isTypeFn");
var _AdapterFn = require("./AdapterFn");
var _crAdapterOHLCV = _interopRequireDefault(require("./crAdapterOHLCV"));
const _fCrAddConfig = function (crAddConfig) {
    if (crAddConfig === void 0) {
      crAddConfig = _AdapterFn.FN_NOOP;
    }
    return _ref => {
      let {
        option,
        json
      } = _ref;
      return {
        ...crAddConfig(option, json),
        zhConfig: (0, _AdapterFn.crZhConfig)(option)
      };
    };
  },
  _compareByDate = (a, b) => a[0] - b[0],
  _fCrDataOHLCV = _ref2 => {
    let {
      d = 0,
      o = 1,
      h = 3,
      l = 4,
      c = 2,
      v = 5,
      crDate = _AdapterFn.FN_IDENTITY,
      crValue = _AdapterFn.FN_IDENTITY,
      crVolume = _AdapterFn.FN_IDENTITY,
      getData = _AdapterFn.FN_IDENTITY,
      n
    } = _ref2;
    return (json, option) => {
      try {
        const _crVolume = v === -1 ? () => void 0 : item => crVolume(item[v]),
          _crNumberOfTrades = (0, _isTypeFn.isStrOrNumber)(n) ? item => item[n] : () => void 0,
          _data = getData(json, option).reduce((data, item) => {
            const date = crDate(item[d]);
            if ((0, _isTypeFn.isTypeNumber)(date)) {
              data.push([date, crValue(item[o]), crValue(item[h]), crValue(item[l]), crValue(item[c]), _crVolume(item), _crNumberOfTrades(item)]);
            }
            return data;
          }, []).sort(_compareByDate);
        return _data;
      } catch {
        throw (0, _AdapterFn.crError)();
      }
    };
  },
  _parseFloat = parseFloat;
const crOptionsFromStr = function (isSeconds) {
  if (isSeconds === void 0) {
    isSeconds = true;
  }
  const _m = isSeconds ? 1000 : 1;
  return {
    crDate: v => _parseFloat(v) * _m,
    crValue: v => (0, _AdapterFn.roundByOHLC)(_parseFloat(v)),
    crVolume: v => _parseFloat(v)
  };
};
exports.crOptionsFromStr = crOptionsFromStr;
const fToKline = options => (0, _crAdapterOHLCV.default)({
  isAth: options.isAth,
  crCaption: options.crCaption,
  getArr: _fCrDataOHLCV(options),
  crAddConfig: _fCrAddConfig(options.crAddConfig)
});
exports.fToKline = fToKline;
//# sourceMappingURL=fToKline.js.map