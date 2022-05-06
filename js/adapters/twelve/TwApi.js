"use strict";

exports.__esModule = true;
exports.default = void 0;

var _fnAdapter = require("./fnAdapter");

const URL = 'https://api.twelvedata.com',
      QUERY_TAIL = 'dp=2&order=ASC&timezone=UTC';
const _isArr = Array.isArray;
const TwApi = {
  getRequestUrl(option) {
    const {
      apiKey,
      items
    } = option,
          symbol = (0, _fnAdapter.getValue)(items[0], {
      isUpper: true
    }),
          interval = (0, _fnAdapter.getValue)(items[1]),
          outputsize = (0, _fnAdapter.getValue)(items[2]);
    return URL + "/time_series?symbol=" + symbol + "&apikey=" + apiKey + "&interval=" + interval + "&outputsize=" + outputsize + "&" + QUERY_TAIL;
  },

  checkResponse(json, option) {
    const {
      values
    } = json || {};

    if (_isArr(values)) {
      return true;
    }

    throw (0, _fnAdapter.crError)('', json.message);
  }

};
var _default = TwApi;
exports.default = _default;
//# sourceMappingURL=TwApi.js.map