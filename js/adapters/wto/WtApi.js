"use strict";

exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _CategoryFn = require("../CategoryFn");
var _fnAdapter = require("./fnAdapter");
const API_URL = 'https://api.wto.org/timeseries/v1/data';
const _crApiUrl = _ref => {
  let {
    proxy,
    dfInd,
    apiKey
  } = _ref;
  return `${proxy}${API_URL}?i=${dfInd}&p=000&subscription-key=${apiKey}`;
};
const WtApi = {
  getRequestUrl(option) {
    const {
        items,
        dfPc
      } = option,
      _r = (0, _AdapterFn.getValue)(items[0]),
      _pc = (0, _AdapterFn.getValue)(items[1]) || dfPc || "TO",
      _url = _crApiUrl(option);
    if ((0, _CategoryFn.isCategory)(option.seriaType)) {
      option.title = option.dfT;
      const _ps = (option.time || '').replace("M", "") || 2023;
      return `${_url}&pc=${_pc}&ps=${_ps}`;
    }
    return `${_url}&r=${_r}&pc=${_pc}&ps=2005-2024`;
  },
  checkResponse: (0, _AdapterFn.fCheckResponse)(_fnAdapter.getDataset)
};
var _default = exports.default = WtApi;
//# sourceMappingURL=WtApi.js.map