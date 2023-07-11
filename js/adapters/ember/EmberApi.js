"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
const URL = 'https://ember-data-api-scg3n.ondigitalocean.app/ember/generation_yearly.json',
  QUERY_TAIL = '&_shape=array';
const EmberApi = {
  getRequestUrl(options) {
    const {
        items
      } = options,
      geo = items[0].c;
    return URL + "?country_or_region__exact=" + geo + "&" + QUERY_TAIL;
  },
  checkResponse(json) {
    if (!(0, _AdapterFn.isArr)(json)) {
      throw (0, _AdapterFn.crError)('', 'There are no data');
    }
  }
};
var _default = EmberApi;
exports.default = _default;
//# sourceMappingURL=EmberApi.js.map