"use strict";

exports.__esModule = true;
exports.default = void 0;
var _fnAdapter = require("./fnAdapter");
const URL = 'https://community-api.coinmetrics.io/v4';
const _isArr = Array.isArray;
const CmApi = {
  getRequestUrl(option) {
    const {
        items = [],
        fromDate
      } = option,
      {
        v: assets
      } = items[0],
      {
        v: metric
      } = items[1],
      [_start, _pageSize] = fromDate ? [`&start_time=${fromDate}`, (0, _fnAdapter.getDaysFromYmd)(fromDate)] : ['', 360];
    option.metric = metric;
    return `${URL}/timeseries/asset-metrics/?assets=${assets.toLowerCase()}&metrics=${metric}&frequency=1d&page_size=${_pageSize}${_start}`;
  },
  checkResponse(json) {
    const {
      data
    } = json || {};
    if (!_isArr(data)) {
      throw (0, _fnAdapter.crError)("Server Response");
    }
  }
};
var _default = exports.default = CmApi;
//# sourceMappingURL=CmApi.js.map