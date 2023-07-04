"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = _interopRequireDefault(require("../crAdapterType1"));
var _fnAdapter = require("./fnAdapter");
const _getObjectKeys = Object.keys,
  _crPnClose = option => "4a. close (" + (0, _fnAdapter.getValue)(option.items[1]) + ")",
  _compareByY = (a, b) => a[0] - b[0];
const crData = (json, option) => {
  const _objData = json['Time Series (Digital Currency Daily)'],
    _pnClose = _crPnClose(option);
  return _objData ? _getObjectKeys(_objData).map(k => [(0, _fnAdapter.ymdToUTC)(k), parseFloat(_objData[k][_pnClose])]).sort(_compareByY) : [];
};
let _adapter;
const CryptocurrencyAdapter = () => _adapter || (_adapter = (0, _crAdapterType.default)({
  crData
}));
var _default = CryptocurrencyAdapter;
exports.default = _default;
//# sourceMappingURL=CryptocurrencyAdapter.js.map