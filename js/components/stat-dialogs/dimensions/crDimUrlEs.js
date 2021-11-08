"use strict";

exports.__esModule = true;
exports.default = void 0;
const ES_BASE_META = "https://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en";

const _crMetaTime = mapFrequency => {
  if (mapFrequency === 'M') {
    return '2019M01';
  }

  if (mapFrequency === 'S') {
    return '2019S1';
  }

  if (mapFrequency === 'Q') {
    return '2019Q1';
  }

  return '2019';
};

const crDimUrlEs = ({
  dfNonTime,
  mapFrequency,
  dfId
}, queryTail) => {
  const _queryTail = [queryTail, dfNonTime ? '' : "time=" + _crMetaTime(mapFrequency)].filter(Boolean).join('&'),
        _qT = _queryTail ? '?' + _queryTail : '';

  return ES_BASE_META + "/" + dfId + _qT;
};

var _default = crDimUrlEs;
exports.default = _default;
//# sourceMappingURL=crDimUrlEs.js.map