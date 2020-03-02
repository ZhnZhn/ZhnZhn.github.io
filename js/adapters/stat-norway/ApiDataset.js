"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var C = {
  ROOT_URL: 'https://data.ssb.no/api/v0/dataset'
};
var DatasetApi = {
  getRequestUrl: function getRequestUrl(option) {
    var dfId = option.dfId;
    return C.ROOT_URL + "/" + dfId + ".json?lang=en";
  },
  checkResponse: function checkResponse() {
    return true;
  }
};
var _default = DatasetApi;
exports["default"] = _default;
//# sourceMappingURL=ApiDataset.js.map