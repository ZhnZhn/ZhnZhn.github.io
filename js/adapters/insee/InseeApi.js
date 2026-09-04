"use strict";

exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _itemFn = require("../../utils/itemFn");
var _ApiFn = require("../ApiFn");
const DATA_URL = 'https://bdm.insee.fr/series/sdmx/data/SERIES_BDM';
const _crUrl = option => `${DATA_URL}/${option.value}?startPeriod=${option.fromDate}`;
const getRequestUrl = option => {
    const {
      items
    } = option;
    if ((0, _isTypeFn.isArr)(items)) {
      const value = (0, _itemFn.getValue)(items[0]);
      option.value = value;
      option.itemCaption = value;
      return _crUrl(option);
    }
    return `${_crUrl(option)}&endPeriod=${option.toDate}`;
  },
  InseeApi = (0, _ApiFn.crProviderApi)(getRequestUrl, _ApiFn.checkResponseIsStr);
var _default = exports.default = InseeApi;
//# sourceMappingURL=InseeApi.js.map