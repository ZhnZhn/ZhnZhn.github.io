"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AvFn = require("../av/AvFn");
var _AdapterFn = require("../AdapterFn");
const _crQuery = option => {
  const {
      items
    } = option,
    symbol = (0, _AdapterFn.getValue)(items[0]),
    market = (0, _AdapterFn.getValue)(items[1]);
  (0, _AdapterFn.assign)(option, {
    itemCaption: `${symbol}/${market}`
  });
  return `${(0, _AvFn.crFunctionQuery)('DIGITAL_CURRENCY_DAILY')}&symbol=${symbol}&market=${market}`;
};
const AvBlockchainApi = (0, _AvFn.fAvApi)(() => _crQuery);
var _default = exports.default = AvBlockchainApi;
//# sourceMappingURL=AvBlockchainApi.js.map