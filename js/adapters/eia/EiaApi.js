"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _CategoryFn = require("../CategoryFn");
var _fnAdapter = require("./fnAdapter");
const API_URL = "https://api.eia.gov/v2",
  QUERY_PARAMS = "sort[0][column]=period&sort[0][direction]=asc&offset=0&length=5000",
  DF_FREQ = 'monthly',
  ID_FREQ = 'freq';
const _isItemFreq = item => (item || {}).id === ID_FREQ;
const _crFacets = items => items.reduce((arr, item) => {
  if (!_isItemFreq(item)) {
    arr.push(`facets[${item.id}][]=${item.v}`);
  }
  return arr;
}, []).join('&');
const _getFrequencyOrDf = items => {
  const _freqItem = items.find(_isItemFreq);
  return _freqItem ? _freqItem.v : DF_FREQ;
};
const EiaApi = {
  getRequestUrl(option) {
    const {
        dfRoute,
        dfSet,
        dfData,
        dfFreq,
        items,
        apiKey,
        time
      } = option,
      _dfSet = (items[0] || {}).dfSet || dfSet,
      _frequency = dfFreq || _getFrequencyOrDf(items),
      _reqUrl = `${API_URL}/${dfRoute}/${_dfSet}/data?frequency=${_frequency}&data[0]=${dfData}&api_key=${apiKey}`;
    if ((0, _CategoryFn.isCategorySeriaType)(option)) {
      return `${_reqUrl}&${_crFacets(items.slice(1))}&start=${time}&end=${time}&${QUERY_PARAMS}`;
    }
    return `${_reqUrl}&${_crFacets(items)}&${QUERY_PARAMS}`;
  },
  checkResponse: (0, _AdapterFn.fCheckResponse)(_fnAdapter.getResponseData)
};
var _default = exports.default = EiaApi;
//# sourceMappingURL=EiaApi.js.map