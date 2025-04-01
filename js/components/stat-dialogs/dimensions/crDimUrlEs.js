"use strict";

exports.__esModule = true;
exports.default = void 0;
var _apiFn = require("../../../adapters/eurostat/api/apiFn");
var _arrFn = require("../../../utils/arrFn");
const _crMetaTime = mapFrequency => mapFrequency === 'M' ? '2019-01' : mapFrequency === 'S' ? '2019-S1' : mapFrequency === 'Q' ? '2019-Q1' : '2019';
const crDimUrlEs = (_ref, queryTail) => {
  let {
    dfNonTime,
    mapFrequency,
    dfId
  } = _ref;
  const _queryTail = (0, _arrFn.filterBoolean)([queryTail, dfNonTime ? '' : `time=${_crMetaTime(mapFrequency)}`]).join('&'),
    _qT = _queryTail ? '?' + _queryTail : '';
  return `${_apiFn.STAT_API_URL}/${dfId}${_qT}`;
};
var _default = exports.default = crDimUrlEs;
//# sourceMappingURL=crDimUrlEs.js.map