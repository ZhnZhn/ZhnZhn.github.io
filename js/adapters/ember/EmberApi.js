"use strict";

exports.__esModule = true;
exports.default = void 0;
var _fnAdapter = require("./fnAdapter");
const URL = 'https://ember-data-api-scg3n.ondigitalocean.app/ember/generation_yearly.json',
  QUERY_TAIL = '&_shape=array';
const EmberApi = {
  getRequestUrl(options) {
    const {
        items
      } = options,
      geo = (0, _fnAdapter.getCaption)(items[0]),
      source = (0, _fnAdapter.getValue)(items[2]),
      _sourceQuery = (0, _fnAdapter.isTotalData)(source) ? '' : "&variable__exact=" + source;
    return URL + "?country_or_region__exact=" + geo + "&" + QUERY_TAIL + "&" + _sourceQuery;
  },
  checkResponse(json) {
    if (!(0, _fnAdapter.isArr)(json)) {
      throw (0, _fnAdapter.crError)('', 'There are no data');
    }
  }
};
var _default = EmberApi;
exports.default = _default;
//# sourceMappingURL=EmberApi.js.map