"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var C = {
  URL: 'https://www.alphavantage.co/query/search',
  FN_SEARCH: 'function=SYMBOL_SEARCH'
};
var SearchAdapter = {
  crUrl: function crUrl(value, _ref) {
    var _ref$apiKey = _ref.apiKey,
        apiKey = _ref$apiKey === void 0 ? '' : _ref$apiKey;
    return C.URL + "?" + C.FN_SEARCH + "&keywords=" + value + "&apikey=" + apiKey;
  },
  crOptions: function crOptions(json) {
    if (!json || !Array.isArray(json.bestMatches)) {
      throw new Error('Response format is not valid');
    }

    return json.bestMatches.map(function (item) {
      return {
        value: item['1. symbol'],
        name: item['2. name'],
        type: item['3. type'],
        region: item['4. region'],
        currency: item['8. currency']
      };
    });
  }
};
var _default = SearchAdapter;
exports["default"] = _default;
//# sourceMappingURL=SearchAdapter.js.map