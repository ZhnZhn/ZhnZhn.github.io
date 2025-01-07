"use strict";

exports.__esModule = true;
exports.PlgApi = void 0;
var _AdapterFn = require("../AdapterFn");
const API_URL = "https://api.polygon.io/v2";
const TO_DATE = (0, _AdapterFn.getFromDate)(0);
const PlgApi = exports.PlgApi = {
  getRequestUrl(option) {
    const {
        apiKey,
        items,
        fromDate
      } = option,
      item1 = (0, _AdapterFn.getValue)(items[0], {
        isUpper: true
      });
    option.apiKey = null;
    option.itemCaption = item1;
    return `${API_URL}/aggs/ticker/${item1}/range/1/day/${fromDate}/${TO_DATE}?adjusted=true&sort=asc&apiKey=${apiKey}`;
  },
  checkResponse: (0, _AdapterFn.fCheckResponse)(json => (json || {}).results)
};
//# sourceMappingURL=PlgApi.js.map