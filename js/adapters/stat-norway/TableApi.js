"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var C = {
  ROOT_URL: 'http://data.ssb.no/api/v0/en/table'
};

var _crTidTop = function _crTidTop(v) {
  return {
    code: "Tid",
    selection: {
      filter: "top",
      values: ['' + v]
    }
  };
};

var StatNorway2Api = {
  getRequestUrl: function getRequestUrl(option) {
    var proxy = option.proxy,
        metric = option.metric,
        dfId = option.dfId,
        id = dfId ? dfId : metric;

    return "" + proxy + C.ROOT_URL + "/" + id;
    //return `${C.ROOT_URL}/${id}`;
  },
  crOptionFetch: function crOptionFetch(option) {
    var items = option.items,
        isTop12 = option.isTop12,
        isTop6 = option.isTop6,
        arrQuery = [];

    items.forEach(function (item) {
      var slice = item.slice;
      var propName = void 0;
      for (propName in slice) {
        arrQuery.push({
          code: propName,
          selection: {
            filter: 'all',
            values: ['*']
          }
        });
      }
    });

    if (isTop12) {
      arrQuery.push(_crTidTop("12"));
    }
    if (isTop6) {
      arrQuery.push(_crTidTop("6"));
    }

    var r = {
      method: 'POST',
      body: JSON.stringify({
        query: arrQuery,
        response: {
          format: "json-stat"
        }
      })
    };
    return r;
  },
  checkResponse: function checkResponse() {
    return true;
  }
};

exports.default = StatNorway2Api;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\stat-norway\TableApi.js.map