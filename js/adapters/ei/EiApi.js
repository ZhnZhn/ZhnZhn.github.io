"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _CategoryFn = require("../CategoryFn");
const DATA_URL = './data/ei';
const _crApiUrl = option => {
  const {
      items
    } = option,
    metric = items[1].v;
  return DATA_URL + "/" + metric;
};
const _crLineUrl = option => {
  const {
      items
    } = option,
    geo = items[0].v;
  return _crApiUrl(option) + "/" + geo + ".json";
};
const _crCategoryUrl = option => {
  const {
    time
  } = option;
  return _crApiUrl(option) + "/by-geo-" + time + ".json";
};
const _crTreeMapUrl = option => {
  const {
      items,
      time,
      dfTmToken
    } = option,
    geo = items[0].v;
  if (time !== '2022') {
    throw {
      message: "TreeMap only available for 2022"
    };
  }
  return DATA_URL + "/" + dfTmToken + "-tm/" + geo + "-" + time + ".json";
};
const IrenaApi = {
  getRequestUrl(option) {
    return (0, _CategoryFn.isTreeMap)(option.seriaType) ? _crTreeMapUrl(option) : (0, _CategoryFn.isCategory)(option.seriaType) ? _crCategoryUrl(option) : _crLineUrl(option);
  },
  checkResponse(json) {
    const {
      data
    } = json || {};
    return (0, _AdapterFn.isArr)(data);
  }
};
var _default = exports.default = IrenaApi;
//# sourceMappingURL=EiApi.js.map