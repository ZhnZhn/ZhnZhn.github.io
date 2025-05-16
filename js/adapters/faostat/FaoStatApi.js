"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _CategoryFn = require("../CategoryFn");
var _AdapterFn = require("../AdapterFn");
var _fnAdapter = require("./fnAdapter");
var _getMemoizedYear = _interopRequireDefault(require("./getMemoizedYear"));
const API_URL = 'https://faostatservices.fao.org/api/v1/en/data',
  QUERY_TAIL = '&area_cs=M49&item_cs=CPC&show_codes=true&show_unit=true&show_flags=true&show_notes=true&null_values=false&page_number=1&datasource=PRODUCTION_AWS&output_type=objects',
  WORLD_LIST_ID = '5000>';
const _isTitle = qT => (0, _AdapterFn.isTokenInStr)(qT, 'World') && qT.length < 22;
const _checkReq = option => {
  if (option._isTs && (0, _fnAdapter.isSeriesReq)(option)) {
    throw new Error('ERR_10');
  }
  if ((0, _fnAdapter.isQueryAllowed)(option)) {
    throw new Error('Query lists for lists is not allowed.');
  }
  const _element = option.items[2] || {};
  if ((0, _CategoryFn.isTreeMap)(option) && !_element.isTm) {
    throw new Error(`TreeMap for ${(0, _AdapterFn.getCaption)(_element)} is not exist.`);
  }
};
const _getListId = geoId => (0, _AdapterFn.isTokenInStr)(geoId, '>') ? geoId : WORLD_LIST_ID;
const FaoStatApi = {
  getRequestUrl(option) {
    _checkReq(option);
    const {
        dfElement,
        dfDomain = 'QC',
        dfItemName = 'item'
      } = option,
      [_one, _two, _three] = (0, _AdapterFn.getValues)(option),
      _element = _three || dfElement,
      [_year, _pageSize] = _one === WORLD_LIST_ID ? [(0, _getMemoizedYear.default)(2004), 5000] : [(0, _getMemoizedYear.default)(1980), 100],
      _apiUrl = `${API_URL}/${dfDomain}?element=${_element}&${dfItemName}=${_two}`,
      _isCategory = (0, _CategoryFn.isCategory)(option),
      _area = _isCategory ? _getListId(_one) : _one,
      _apiQuery = _isCategory ? `area=${_area}&year=${option.time}&page_size=300` : `area=${_area}&year=${_year}&page_size=${_pageSize}`;
    return `${_apiUrl}&${_apiQuery}${QUERY_TAIL}`;
  },
  checkResponse: (0, _AdapterFn.fCheckResponse)(),
  addPropsTo(option) {
    const {
        qA,
        qI,
        qE,
        qT = ''
      } = option,
      title = _isTitle(qT) ? qT : '';
    (0, _AdapterFn.assign)(option, {
      items: [{
        v: qA
      }, {
        v: qI
      }, {
        v: qE
      }],
      itemCaption: 'Item',
      title
    });
  }
};
var _default = exports.default = FaoStatApi;
//# sourceMappingURL=FaoStatApi.js.map