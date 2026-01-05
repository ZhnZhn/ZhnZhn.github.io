"use strict";

exports.__esModule = true;
exports.MsvApi = void 0;
var _itemFn = require("../../utils/itemFn");
var _AdapterFn = require("../AdapterFn");
const API_URL = "https://api.massive.com/v2";
const TO_DATE = (0, _AdapterFn.getFromDate)(0);
const MsvApi = exports.MsvApi = {
  getRequestUrl(option) {
    const {
        apiKey,
        items,
        fromDate
      } = option,
      item1 = (0, _itemFn.getValueUpperCase)(items[0]);
    option.apiKey = null;
    option.itemCaption = item1;
    return `${API_URL}/aggs/ticker/${item1}/range/1/day/${fromDate}/${TO_DATE}?adjusted=true&sort=asc&apiKey=${apiKey}`;
  },
  checkResponse: (0, _AdapterFn.fCheckResponse)(json => (json || {}).results)
};
//# sourceMappingURL=MsvApi.js.map