"use strict";

exports.__esModule = true;
exports.default = void 0;
var _ApiFn = require("../ApiFn");
var _CategoryFn = require("../CategoryFn");
const DATA_URL = './data/irena';
const _crApiUrl = option => {
  const {
      items
    } = option,
    metric = items[1].v,
    source = items[2].v;
  return `${DATA_URL}/${metric}/${source}`;
};
const _crLineUrl = option => {
  const {
      items
    } = option,
    geo = items[0].v;
  return `${_crApiUrl(option)}/${geo}.json`;
};
const _crCategoryUrl = option => {
  const {
    time
  } = option;
  return `${_crApiUrl(option)}/by-geo-${time}.json`;
};
const IrenaApi = {
  getRequestUrl(option) {
    return (0, _CategoryFn.isCategory)(option.seriaType) ? _crCategoryUrl(option) : _crLineUrl(option);
  },
  checkResponse: _ApiFn.checkResponseData
};
var _default = exports.default = IrenaApi;
//# sourceMappingURL=IrenaApi.js.map