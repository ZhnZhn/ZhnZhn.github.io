'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var C = {
  ROOT_URL: 'https://data.ssb.no/api/v0/dataset'
};

var DatasetApi = {
  getRequestUrl: function getRequestUrl(option) {
    var metric = option.metric,
        dfId = option.dfId,
        id = dfId ? dfId : metric;

    return C.ROOT_URL + '/' + id + '.json?lang=en';
  },
  checkResponse: function checkResponse() {
    return true;
  }
};

exports.default = DatasetApi;
//# sourceMappingURL=ApiDataset.js.map