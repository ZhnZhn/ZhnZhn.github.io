"use strict";

exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = require("../crAdapterType1");
var _compareByFn = require("../compareByFn");
var _fnAdapter = require("./fnAdapter");
const _getObjectKeys = Object.keys,
  _crPnClose = option => `4a. close (${(0, _fnAdapter.getValue)(option.items[1])})`;
const crData = (json, option) => {
  const _objData = json['Time Series (Digital Currency Daily)'],
    _pnClose = _crPnClose(option);
  return _objData ? _getObjectKeys(_objData).map(k => [(0, _fnAdapter.ymdToUTC)(k), parseFloat(_objData[k][_pnClose])]).sort(_compareByFn.compareByDate) : [];
};
let _adapter;
const CryptocurrencyAdapter = () => _adapter || (_adapter = (0, _crAdapterType.crAdapterType1)({
  crData
}));
var _default = exports.default = CryptocurrencyAdapter;
//# sourceMappingURL=CryptocurrencyAdapter.js.map