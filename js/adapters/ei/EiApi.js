"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _AdapterFn = require("../AdapterFn");
var _CategoryFn = require("../CategoryFn");
var _fCrLineCategoryUrl = _interopRequireDefault(require("../fCrLineCategoryUrl"));
const DATA_URL = './data/ei';
const [_crLineUrl, _crCategoryUrl] = (0, _fCrLineCategoryUrl.default)(DATA_URL);
const _crTreeMapUrl = (option, _isTreeMap) => {
  const {
      items,
      time,
      dfTmToken
    } = option,
    geo = items[0].v;
  if (!(0, _AdapterFn.isInRange)((0, _isTypeFn.parseIntBy10)(time), 2018, 2025)) {
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
const EiApi = {
  getRequestUrl(option) {
    const _isTreeMap = (0, _CategoryFn.isTreeMap)(option);
    return _isTreeMap || (0, _CategoryFn.isBarTreeMap)(option) ? _crTreeMapUrl(option, _isTreeMap) : (0, _CategoryFn.isCategory)(option) ? _crCategoryUrl(option) : _crLineUrl(option);
  },
  checkResponse: (0, _AdapterFn.fCheckResponse)()
};
var _default = exports.default = EiApi;
//# sourceMappingURL=EiApi.js.map