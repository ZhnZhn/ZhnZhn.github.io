"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _crFn = require("../crFn");
var _fToKline = require("../fToKline");
var _CL = require("../CL");
const _crResearchLink = (0, _crFn.fCrItemLinkByCaption)('Binance Research');
const _crTradeLink = (0, _crFn.fCrItemLinkByCaption)('Binance Trade Chart');
const _crDescription = _ref => {
  let {
    _researchLink,
    _tradeLink
  } = _ref;
  return _crResearchLink(_researchLink, _CL.CL_PB_8) + _crTradeLink(_tradeLink);
};
const _crInfo = option => ({
  name: option.title,
  description: _crDescription(option)
});

/*
From Binance API Documentation
[
    1499040000000,      // Open time
    "0.01634790",       // Open
    "0.80000000",       // High
    "0.01575800",       // Low
    "0.01577100",       // Close
    "148976.11427815",  // Volume
    1499644799999,      // Close time
    "2434.19055334",    // Quote asset volume
    308,                // Number of trades
    "1756.87402397",    // Taker buy base asset volume
    "28.46694368",      // Taker buy quote asset volume
    "17928899.62484339" // Ignore.
  ]
*/

const _crValue = v => parseFloat(v);
const toKline = (0, _fToKline.fToKline)({
  d: 6,
  o: 1,
  h: 2,
  l: 3,
  c: 4,
  n: 8,
  crValue: _crValue,
  crVolume: _crValue,
  crAddConfig: option => {
    (0, _AdapterFn.setItemCaptionTo)(option, (0, _AdapterFn.crShortItemCaption)(option.title));
    return {
      info: _crInfo(option)
    };
  }
});
var _default = exports.default = toKline;
//# sourceMappingURL=toKline.js.map