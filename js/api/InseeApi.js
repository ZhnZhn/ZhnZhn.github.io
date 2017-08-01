'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var C = {
  //ROOT: 'https://crossorigin.me/https://bdm.insee.fr/series/sdmx/data/SERIES_BDM/'
  ROOT: 'https://bdm.insee.fr/series/sdmx/data/SERIES_BDM/'
};

var InseeApi = {
  getRequestUrl: function getRequestUrl(option) {
    var proxy = option.proxy,
        value = option.value,
        fromDate = option.fromDate,
        toDate = option.toDate;

    return '' + proxy + C.ROOT + value + '?startPeriod=' + fromDate + '&endPeriod=' + toDate;
  },
  checkResponse: function checkResponse(str) {
    return true;
  }
};

exports.default = InseeApi;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\api\InseeApi.js.map