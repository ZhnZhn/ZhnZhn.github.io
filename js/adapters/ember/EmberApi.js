"use strict";

exports.__esModule = true;
exports.default = void 0;

var _AdapterFn = require("../AdapterFn");

const URL = './data/ember/annual';
const GENERAL_TOTAL_GEO = 'general-total';

const _isTotalShare = (source, metric) => source === 'total' && metric === 'share';

const EmberApi = {
  getRequestUrl(option) {
    const {
      items
    } = option,
          metric = items[1].v,
          source = items[2].v,
          geo = _isTotalShare(source, metric) ? GENERAL_TOTAL_GEO : items[0].v;
    return URL + "/" + metric + "/" + source + "/" + geo + ".json";
  },

  checkResponse(json) {
    const {
      data
    } = json || {};
    return (0, _AdapterFn.isArr)(data);
  }

};
var _default = EmberApi;
exports.default = _default;
//# sourceMappingURL=EmberApi.js.map