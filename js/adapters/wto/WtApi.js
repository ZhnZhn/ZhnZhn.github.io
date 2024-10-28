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
        dfPc,
        dfT
      } = option,
      _r = (0, _AdapterFn.getValue)(items[0]),
      _item1 = items[1],
      _pc = (0, _AdapterFn.getValue)(_item1) || dfPc || "TO",
      _url = _crApiUrl(option);
    if ((0, _CategoryFn.isCategorySeriaType)(option)) {
      const _caption1 = (0, _AdapterFn.getCaption)(_item1);
      if (_caption1) {
        option.title = _caption1;
        option.subtitle = dfT;
      } else {
        option.title = dfT;
      }
      const _ps = (option.time || '').replace("M", "") || 2023;
      return `${_url}&pc=${_pc}&ps=${_ps}`;
    }
    return `${_url}&r=${_r}&pc=${_pc}&ps=2005-2024`;
  },
  checkResponse: (0, _AdapterFn.fCheckResponse)(_fnAdapter.getDataset)
};
var _default = exports.default = WtApi;
//# sourceMappingURL=WtApi.js.map