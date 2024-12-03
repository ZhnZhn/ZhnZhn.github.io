"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
const API_URL = "https://api.coincap.io/v2";
const _setTitleTo = (option, title) => (0, _AdapterFn.assign)(option, {
  title
});
const CoinCapApi = {
  getRequestUrl(option) {
    const {
        items
      } = option,
      offset = (0, _AdapterFn.getValue)(items[0]),
      limit = (0, _AdapterFn.getValue)(items[1]);
    _setTitleTo(option, `By USD Market Cap Page: ${offset} (${limit})`);
    return `${API_URL}/assets?limit=${limit}&offset=${(parseInt(offset) - 1) * parseInt(limit)}`;
  },
  checkResponse(json) {
    if (!(0, _AdapterFn.isArr)((json || {}).data)) {
      throw (0, _AdapterFn.crError)();
    }
  }
};
var _default = exports.default = CoinCapApi;
//# sourceMappingURL=CoinCapApi.js.map