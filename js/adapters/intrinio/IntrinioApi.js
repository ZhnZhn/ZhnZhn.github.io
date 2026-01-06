"use strict";

exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _dateFn = require("../../utils/dateFn");
var _itemFn = require("../../utils/itemFn");
var _AdapterFn = require("../AdapterFn");
const API_URL = 'https://api.intrinio.com/historical_data',
  RES_ERR_STATUS = [401],
  TO_DATE = (0, _dateFn.getToDate)();
const _getErr = json => json && (0, _isTypeFn.isArr)(json.errors) && json.errors[0];
const _crUrl = (identifier, fromDate) => `${API_URL}?identifier=${identifier}&start_date=${fromDate}`;
const IntrinioApi = {
  crOptionFetch(option) {
    const {
      apiKey
    } = option;
    return {
      headers: {
        'X-Authorization-Public-Key': apiKey
      }
    };
  },
  getRequestUrl(option) {
    const {
      fromDate,
      items
    } = option;
    option.one = (0, _itemFn.getValue)(items[0]);
    option.two = (0, _itemFn.getValue)(items[1]);
    option.three = (0, _itemFn.getValue)(items[0]) || 'QTR';
    const {
      one,
      two,
      three
    } = option;
    option.resErrStatus = RES_ERR_STATUS;
    if (two) {
      return `${_crUrl(one, fromDate)}&item=${two}&end_date=${TO_DATE}&type=${three}`;
    }
  },
  checkResponse(json) {
    const _jsonErr = _getErr(json);
    if (_jsonErr) {
      throw (0, _AdapterFn.crError)(_jsonErr.human, _jsonErr.message);
    }
    if (!(0, _isTypeFn.isArr)(json.data)) {
      throw (0, _AdapterFn.crError)();
    }
  }
};
var _default = exports.default = IntrinioApi;
//# sourceMappingURL=IntrinioApi.js.map