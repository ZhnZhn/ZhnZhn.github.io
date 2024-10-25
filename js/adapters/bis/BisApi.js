"use strict";

exports.__esModule = true;
exports.default = void 0;
var _CategoryFn = require("../CategoryFn");
var _fnAdapter = require("./fnAdapter");
const BIS_API = "https://stats.bis.org/api/v2/data/dataflow/BIS";
const BisApi = {
  getRequestUrl(option) {
    const queryToken = (0, _CategoryFn.isCategorySeriaType)(option) ? `c%5BTIME_PERIOD%5D=${option.time}` : `c%5BTIME_PERIOD%5D=ge%3A${option.fromDate}`;
    return `${option.proxy}${BIS_API}/${option.dfCase}/1.0/${(0, _fnAdapter.crItemId)(option)}?${queryToken}`;
  }
};
var _default = exports.default = BisApi;
//# sourceMappingURL=BisApi.js.map