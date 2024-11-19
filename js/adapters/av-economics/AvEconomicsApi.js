"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AvFn = require("../av/AvFn");
var _AdapterFn = require("../AdapterFn");
const _crEconomicsQuery = option => {
  const {
      items
    } = option,
    [value, itemCaption] = (0, _AdapterFn.getValueCaption)(items[0]);
  (0, _AdapterFn.assign)(option, {
    itemCaption
  });
  return (0, _AvFn.crFunctionQuery)(value);
};
const _isDailyInterval = (0, _AdapterFn.isInArrStr)(['daily', 'weekly']),
  _isQuarterlyInterval = (0, _AdapterFn.isInArrStr)(['quarterly', 'annual']);
const _checkCommoditiesParams = (item, interval) => {
  const [itemId, itemCaption] = (0, _AdapterFn.getValueCaption)(item),
    [intervalId, _intervalCaption] = (0, _AdapterFn.getValueCaption)(interval);
  if (!item.dw && _isDailyInterval(intervalId) || item.dw && _isQuarterlyInterval(intervalId)) {
    throw (0, _AdapterFn.crError)(_AvFn.REQ_ERROR, `Interval ${_intervalCaption} is absent for ${itemCaption}`);
  }
  return [itemId, itemCaption, intervalId];
};
const _crCommoditiesQuery = option => {
  const {
      items
    } = option,
    [item, interval] = items,
    [itemId, itemCaption, intervalId] = _checkCommoditiesParams(item, interval);
  (0, _AdapterFn.assign)(option, {
    itemCaption
  });
  return `${(0, _AvFn.crFunctionQuery)(itemId)}&interval=${intervalId}`;
};
const _getCrQuery = (0, _AdapterFn.crGetRoute)({
  EC: _crEconomicsQuery,
  CM: _crCommoditiesQuery
});
const AvEconomicsApi = (0, _AvFn.fAvApi)(option => _getCrQuery(option.dfFn));
var _default = exports.default = AvEconomicsApi;
//# sourceMappingURL=AvEconomicsApi.js.map