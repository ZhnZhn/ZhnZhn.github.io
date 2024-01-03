"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
const DATA_URL = 'https://bdm.insee.fr/series/sdmx/data/SERIES_BDM';
const _crUrl = option => `${DATA_URL}/${option.value}?startPeriod=${option.fromDate}`;
const InseeApi = {
  getRequestUrl(option) {
    const {
      items
    } = option;
    if ((0, _AdapterFn.isArr)(items)) {
      const value = (0, _AdapterFn.getValue)(items[0]);
      option.value = value;
      option.itemCaption = value;
      return _crUrl(option);
    }
    return `${_crUrl(option)}&endPeriod=${option.toDate}`;
  }
};
var _default = exports.default = InseeApi;
//# sourceMappingURL=InseeApi.js.map