"use strict";

exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _AdapterFn = require("../AdapterFn");
var _compareByFn = require("../compareByFn");
var _crAdapterType = require("../crAdapterType1");
const crData = (json, option) => {
    const _objData = json["Time Series (Digital Currency Daily)"];
    return (0, _isTypeFn.getObjectKeys)(_objData).map(k => [(0, _AdapterFn.ymdToUTC)(k), parseFloat(_objData[k]["4. close"])]).sort(_compareByFn.compareByDate);
  },
  AvBlockchainAdapter = (0, _crAdapterType.crAdapterType1)({
    crData
  });
var _default = exports.default = AvBlockchainAdapter;
//# sourceMappingURL=AvBlockchainAdapter.js.map