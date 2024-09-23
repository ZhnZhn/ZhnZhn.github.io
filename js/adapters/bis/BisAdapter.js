"use strict";

exports.__esModule = true;
exports.default = void 0;
var _crAdapterType = require("../crAdapterType1");
var _AdapterFn = require("../AdapterFn");
var _compareByFn = require("../compareByFn");
const ITEM_URL = "https://data.bis.org/topics";
const crData = (str, option) => {
  const xml = (0, _AdapterFn.crXmlDocument)(str),
    series = (xml.getElementsByTagName('Series') || [])[0] || {},
    elementCount = series.childElementCount,
    data = [];
  let i = 0,
    _point;
  for (; i < elementCount; i++) {
    _point = series.childNodes[i];
    data.push([(0, _AdapterFn.ymdToUTC)(_point.getAttribute("TIME_PERIOD")), parseFloat(_point.getAttribute("OBS_VALUE"))]);
  }
  return data.sort(_compareByFn.compareByDate);
};
const _crDfLink = option => `${ITEM_URL}/${option.dfTopic}/BIS,${option.dfCase},1.0/${option.items[0].v}`;
const BisAdapter = (0, _crAdapterType.crAdapterType1)({
  crData,
  addToConfig: (0, _AdapterFn.fAddToConfigInfoAndDfLink)("BIS", _crDfLink)
});
var _default = exports.default = BisAdapter;
//# sourceMappingURL=BisAdapter.js.map