"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _itemFn = require("../../utils/itemFn");
var _mathFn = require("../../math/mathFn");
var _AdapterFn = require("../AdapterFn");
var _CategoryFn = require("../CategoryFn");
var _fCrLineCategoryUrl = _interopRequireDefault(require("../fCrLineCategoryUrl"));
const DATA_URL = "./data/ember",
  [_crTimeSeriesLineUrl, _crTimeSeriesCategoryUrl] = (0, _fCrLineCategoryUrl.default)(DATA_URL),
  isTsRoute = _ref => {
    let {
      dfId
    } = _ref;
    return dfId === "EU" || dfId === "EG" || dfId === "UEG" || dfId === "PV" || dfId === "WS";
  };
const _crTimeSeriesTreeMapUrl = (option, _isTreeMap) => {
  const {
      items,
      time
    } = option,
    geo = (0, _itemFn.getValue)(items[0]),
    metricItem = items[2],
    metricCaption = (0, _itemFn.getCaption)(metricItem),
    metricValue = (0, _itemFn.getValue)(metricItem);
  if (metricItem.isTm !== 1) {
    throw (0, _AdapterFn.crErrorByMessage)(`TreeMap and Bar charts by Source for ${metricCaption} not available`);
  }
  if (!(0, _mathFn.isInRange)((0, _isTypeFn.parseIntBy10)(time), 2020, 2026)) {
    const _typeOfChartToken = _isTreeMap ? 'TreeMap' : 'Bar by Source';
    throw (0, _AdapterFn.crErrorByMessage)(`${_typeOfChartToken} only available for 2021-2024`);
  }
  if (!_isTreeMap) {
    option.subtitle = option.title;
    option.title = metricCaption;
  }
  return `${DATA_URL}/${metricValue}-tm/${geo}-${time}.json`;
};
const EmberApi = {
  getRequestUrl(option) {
    if (isTsRoute(option)) {
      const _isTreeMap = (0, _CategoryFn.isTreeMap)(option);
      return _isTreeMap || (0, _CategoryFn.isBarTreeMap)(option) ? _crTimeSeriesTreeMapUrl(option, _isTreeMap) : (0, _CategoryFn.isCategory)(option) ? _crTimeSeriesCategoryUrl(option) : _crTimeSeriesLineUrl(option);
    }
    throw (0, _AdapterFn.crErrorByMessage)('Api route does not exist');
  },
  checkResponse(json) {
    if (!(0, _isTypeFn.isArr)(json?.data)) {
      throw (0, _AdapterFn.crError)();
    }
  }
};
var _default = exports.default = EmberApi;
//# sourceMappingURL=EmberApi.js.map