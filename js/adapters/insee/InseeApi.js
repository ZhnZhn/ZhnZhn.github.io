"use strict";

exports.__esModule = true;
exports.default = void 0;
const DATA_URL = 'https://bdm.insee.fr/series/sdmx/data/SERIES_BDM';
const InseeApi = {
  getRequestUrl(option) {
    return DATA_URL + "/" + option.value + "?startPeriod=" + option.fromDate + "&endPeriod=" + option.toDate;
  },
  checkResponse() {
    return true;
  }
};
var _default = InseeApi;
exports.default = _default;
//# sourceMappingURL=InseeApi.js.map