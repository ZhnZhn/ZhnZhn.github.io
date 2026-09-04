"use strict";

exports.__esModule = true;
exports.default = void 0;
var _ApiFn = require("../ApiFn");
var _CategoryFn = require("../CategoryFn");
var _fnAdapter = require("./fnAdapter");
const API_URL = "https://sdmx.oecd.org/public/rest/data";
const _crCategoryQueryDate = time => `startPeriod=${time}&endPeriod=${time}`,
  getRequestUrl = option => {
    const queryDate = (0, _CategoryFn.isCategory)(option) ? _crCategoryQueryDate(option.time) : "startPeriod=2005";
    return `${API_URL}/${option.dfDs}/${(0, _fnAdapter.crItemId)(option)}?${queryDate}&format=jsondata`;
  },
  OecdApi = (0, _ApiFn.crProviderApi)(getRequestUrl, null);
var _default = exports.default = OecdApi;
//# sourceMappingURL=OecdApi.js.map