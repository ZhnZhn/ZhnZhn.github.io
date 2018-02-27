"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crTidTop = function _crTidTop(v) {
  return {
    code: "Tid",
    selection: {
      filter: "top",
      values: ['' + v]
    }
  };
};

var fTableApi = function fTableApi(ROOT_URL) {
  return {
    getRequestUrl: function getRequestUrl(option) {
      var proxy = option.proxy,
          metric = option.metric,
          dfId = option.dfId,
          id = dfId ? dfId : metric;

      return "" + proxy + ROOT_URL + "/" + id;
    },
    crOptionFetch: function crOptionFetch(option) {
      var _option$items = option.items,
          items = _option$items === undefined ? [] : _option$items,
          isTop12 = option.isTop12,
          isTop6 = option.isTop6,
          arrQuery = [];

      items.forEach(function (item) {
        var _ref = item || {},
            slice = _ref.slice;

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
};

exports.default = fTableApi;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\stat-json\fTableApi.js.map