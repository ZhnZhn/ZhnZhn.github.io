"use strict";

exports.__esModule = true;
exports.default = void 0;
var _ApiFn = require("../ApiFn");
var _AdapterFn = require("../AdapterFn");
var _CategoryFn = require("../CategoryFn");
const DATA_URL = './data/ei';
const _crApiUrl = option => {
  const {
      items
    } = option,
    metric = items[1].v;
  return `${DATA_URL}/${metric}`;
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
const _crTreeMapUrl = (option, _isTreeMap) => {
  const {
      items,
      time,
      dfTmToken
    } = option,
    geo = items[0].v;
  if (!(0, _AdapterFn.isInRange)(parseInt(time), 2018, 2024)) {
    const _typeOfChartToken = _isTreeMap ? 'TreeMap' : 'Bar by metric';
    throw {
      message: `${_typeOfChartToken} only available for 2019-2023`
    };
  }
  if (!_isTreeMap) {
    option.subtitle = option.title;
    option.title = option.dfTmTitle;
  }
  return `${DATA_URL}/${dfTmToken}-tm/${geo}-${time}.json`;
};
const IrenaApi = {
  getRequestUrl(option) {
    const {
        seriaType
      } = option,
      _isTreeMap = (0, _CategoryFn.isTreeMap)(seriaType);
    return _isTreeMap || (0, _CategoryFn.isBarTreeMap)(seriaType) ? _crTreeMapUrl(option, _isTreeMap) : (0, _CategoryFn.isCategory)(seriaType) ? _crCategoryUrl(option) : _crLineUrl(option);
  },
  checkResponse: _ApiFn.checkResponseData
};
var _default = exports.default = IrenaApi;
//# sourceMappingURL=EiApi.js.map