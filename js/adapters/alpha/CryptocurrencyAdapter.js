"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));
var _compareByFn = require("../compareByFn");
var _fnAdapter = require("./fnAdapter");
const _getObjectKeys = Object.keys,
  _crPnClose = option => "4a. close (" + (0, _fnAdapter.getValue)(option.items[1]) + ")";
const crData = (json, option) => {
  const _objData = json['Time Series (Digital Currency Daily)'],
    _pnClose = _crPnClose(option);
  return _objData ? _getObjectKeys(_objData).map(k => [(0, _fnAdapter.ymdToUTC)(k), parseFloat(_objData[k][_pnClose])]).sort(_compareByFn.compareByDate) : [];
};
let _adapter;
const CryptocurrencyAdapter = () => _adapter || (_adapter = (0, _crAdapterType.default)({
  crData
}));
var _default = CryptocurrencyAdapter;
exports.default = _default;
//# sourceMappingURL=CryptocurrencyAdapter.js.map