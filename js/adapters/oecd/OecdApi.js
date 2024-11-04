"use strict";

exports.__esModule = true;
exports.default = void 0;
var _CategoryFn = require("../CategoryFn");
var _fnAdapter = require("./fnAdapter");
const API_URL = "https://sdmx.oecd.org/public/rest/data";
const OecdApi = {
  getRequestUrl(option) {
    const {
        time
      } = option,
      queryDate = (0, _CategoryFn.isCategory)(option) ? `startPeriod=${time}&endPeriod=${time}` : "startPeriod=2005";
    return `${API_URL}/${option.dfDs}/${(0, _fnAdapter.crItemId)(option)}?${queryDate}&format=jsondata`;
  }
};
var _default = exports.default = OecdApi;
//# sourceMappingURL=OecdApi.js.map