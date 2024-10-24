"use strict";

exports.__esModule = true;
exports.default = void 0;
const API_URL = "https://sdmx.oecd.org/public/rest/data";
const OecdApi = {
  getRequestUrl(option) {
    const {
      items
    } = option;
    return `${API_URL}/${option.dfDs}/${items[0].v}.Q.${items[1].v}.IX?startPeriod=2005&format=jsondata`;
  },
  checkResponse() {}
};
var _default = exports.default = OecdApi;
//# sourceMappingURL=OecdApi.js.map