"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _CategoryFn = require("../CategoryFn");
var _fnAdapter = require("./fnAdapter");
var _getMemoizedYear = _interopRequireDefault(require("./getMemoizedYear"));
const API_URL = 'https://faostatservices.fao.org/api/v1/en/data',
  TAIL = '&area_cs=M49&item_cs=CPC&show_codes=true&show_unit=true&show_flags=true&show_notes=true&null_values=false&page_number=1&datasource=PRODUCTION_AWS&output_type=objects',
  WORLD_LIST_ID = '5000>';
const _isArr = Array.isArray,
  _assign = Object.assign;
const _isTitle = qT => qT.indexOf('World') !== -1 && qT.length < 22;
const _checkReq = option => {
  if (option._isTs && (0, _fnAdapter.isSeriesReq)(option)) {
    throw new Error('ERR_10');
  }
  if ((0, _fnAdapter.isQueryAllowed)(option)) {
    throw new Error('Query lists for lists is not allowed.');
  }
};
const FaoStatApi = {
  getRequestUrl(option) {
    _checkReq(option);
    const {
        items,
        dfElement,
        dfDomain = 'QC',
        dfItemName = 'item',
        seriaType
      } = option,
      _one = (0, _fnAdapter.getValue)(items[0]),
      _two = (0, _fnAdapter.getValue)(items[1]),
      _three = (0, _fnAdapter.getValue)(items[2]),
      _element = _three || dfElement,
      [_year, _pageSize] = _one === WORLD_LIST_ID ? [(0, _getMemoizedYear.default)(2004), 5000] : [(0, _getMemoizedYear.default)(1980), 100],
      _apiUrl = API_URL + "/" + dfDomain + "?element=" + _element + "&" + dfItemName + "=" + _two,
      _apiQuery = (0, _CategoryFn.isCategory)(seriaType) ? "area=" + WORLD_LIST_ID + "&year=" + option.time + "&page_size=300" : "area=" + _one + "&year=" + _year + "&page_size=" + _pageSize;
    return _apiUrl + "&" + _apiQuery + TAIL;
  },
  checkResponse(json) {
    if (!(json && _isArr(json.data))) {
      throw (0, _fnAdapter.crError)();
    }
  },
  addPropsTo(option) {
    const {
        qA,
        qI,
        qE,
        qT = ''
      } = option,
      title = _isTitle(qT) ? qT : '';
    _assign(option, {
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