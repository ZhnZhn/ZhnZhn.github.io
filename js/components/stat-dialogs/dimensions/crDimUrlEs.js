"use strict";

exports.__esModule = true;
exports.default = void 0;
var _apiFn = require("../../../adapters/eurostat/api/apiFn");
const _crMetaTime = mapFrequency => {
  if (mapFrequency === 'M') {
    return '2019-01';
  }
  if (mapFrequency === 'S') {
    return '2019-S1';
  }
  if (mapFrequency === 'Q') {
    return '2019-Q1';
  }
  return '2019';
};
const crDimUrlEs = (_ref, queryTail) => {
  let {
    dfNonTime,
    mapFrequency,
    dfId
  } = _ref;
  const _queryTail = [queryTail, dfNonTime ? '' : "time=" + _crMetaTime(mapFrequency)].filter(Boolean).join('&'),
    _qT = _queryTail ? '?' + _queryTail : '';
  return _apiFn.STAT_API_URL + "/" + dfId + _qT;
};
var _default = crDimUrlEs;
exports.default = _default;
//# sourceMappingURL=crDimUrlEs.js.map