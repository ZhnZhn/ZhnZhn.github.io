"use strict";

exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = require("../crAdapterType1");
var _AdapterFn = require("../AdapterFn");
var _compareByFn = require("../compareByFn");
var _fnAdapter = require("./fnAdapter");
const ITEM_URL = "https://data.bis.org/topics";
const crData = (str, option) => {
  const seriesCollection = (0, _fnAdapter.getSeriesCollection)(str)[0] || {},
    elementCount = seriesCollection.childElementCount,
    data = [];
  let i = 0,
    _obsElement;
  for (; i < elementCount; i++) {
    _obsElement = seriesCollection.childNodes[i];
    data.push([(0, _fnAdapter.getTimePeriod)(_obsElement), (0, _fnAdapter.getObsValue)(_obsElement)]);
  }
  return data.sort(_compareByFn.compareByDate);
};
const _crDfLink = option => `${ITEM_URL}/${option.dfTopic}/BIS,${option.dfCase},1.0/${(0, _fnAdapter.crItemId)(option)}`;
const toLineAdapter = (0, _crAdapterType.crAdapterType1)({
  crData,
  addToConfig: (0, _AdapterFn.fAddToConfigInfoAndDfLink)("BIS", _crDfLink)
});
var _default = exports.default = toLineAdapter;
//# sourceMappingURL=toLineAdapter.js.map