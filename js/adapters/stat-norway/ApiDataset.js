'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var C = {
  ROOT_URL: 'http://data.ssb.no/api/v0/dataset'
};

var DatasetApi = {
  getRequestUrl: function getRequestUrl(option) {
    var proxy = option.proxy,
        metric = option.metric,
        dfId = option.dfId,
        id = dfId ? dfId : metric;

    return '' + proxy + C.ROOT_URL + '/' + id + '.json?lang=en';
  },
  checkResponse: function checkResponse() {
    return true;
  }
};

exports.default = DatasetApi;
//# sourceMappingURL=ApiDataset.js.map