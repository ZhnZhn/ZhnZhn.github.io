"use strict";

exports.__esModule = true;
exports.default = void 0;
const API_URL = "https://www.alphavantage.co/query/search",
  FN_SEARCH = "function=SYMBOL_SEARCH";
const SearchAdapter = {
  crUrl: (value, _ref) => {
    let {
      apiKey = ""
    } = _ref;
    return `${API_URL}?${FN_SEARCH}&keywords=${value}&apikey=${apiKey}`;
  },
  crOptions: json => {
    if (!json || !Array.isArray(json.bestMatches)) {
      throw new Error("Response format is not valid");
    }
    return json.bestMatches.map(item => ({
      value: item["1. symbol"],
      name: item["2. name"],
      type: item["3. type"],
      region: item["4. region"],
      currency: item["8. currency"]
    }));
  }
};
var _default = exports.default = SearchAdapter;
//# sourceMappingURL=SearchAdapter.js.map