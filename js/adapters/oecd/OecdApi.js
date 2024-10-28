"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _CategoryFn = require("../CategoryFn");
const API_URL = "https://sdmx.oecd.org/public/rest/data";
const OecdApi = {
  getRequestUrl(option) {
    const {
        items,
        time
      } = option,
      _isCategory = (0, _CategoryFn.isCategory)(option),
      _item0 = _isCategory ? "" : (0, _AdapterFn.getValue)(items[0]),
      queryDate = _isCategory ? `startPeriod=${time}&endPeriod=${time}` : "startPeriod=2005";
    return `${API_URL}/${option.dfDs}/${_item0}.Q.${(0, _AdapterFn.getValue)(items[1])}.IX?${queryDate}&format=jsondata`;
  }
};
var _default = exports.default = OecdApi;
//# sourceMappingURL=OecdApi.js.map