"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
const DATA_URL = './data/imf/weo-commodity';
const _crDataUrl = dfFn => {
  const suffix = dfFn === "CP" ? "prices" : "price-indices";
  return `${DATA_URL}-${suffix}`;
};
const _crLineUrl = (option, dataUrl) => `${dataUrl}/${(0, _AdapterFn.getValues)(option)[0]}.json`;
const ImfTsApi = {
  getRequestUrl(option) {
    return _crLineUrl(option, _crDataUrl(option.dfFn));
  },
  checkResponse: (0, _AdapterFn.fCheckResponse)()
};
var _default = exports.default = ImfTsApi;
//# sourceMappingURL=ImfTsApi.js.map