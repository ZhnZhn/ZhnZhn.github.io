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

var _checkTop = function _checkTop(isTop, strN, arr) {
  if (isTop) {
    arr.push(_crTidTop(strN));
  }
};

var fTableApi = function fTableApi(ROOT_URL) {
  return {
    getRequestUrl: function getRequestUrl(option) {
      var _option$proxy = option.proxy,
          proxy = _option$proxy === undefined ? '' : _option$proxy,
          metric = option.metric,
          dfId = option.dfId,
          id = dfId || metric;

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

        for (var propName in slice) {
          arrQuery.push({
            code: propName,
            selection: {
              filter: 'item',
              values: [slice[propName]]
              //filter: 'all',
              //values: ['*']
            }
          });
        }
      });

      _checkTop(isTop12, '12', arrQuery);
      _checkTop(isTop6, '6', arrQuery);

      return {
        method: 'POST',
        body: JSON.stringify({
          query: arrQuery,
          response: {
            format: "json-stat"
          }
        })
      };
    },
    checkResponse: function checkResponse() {
      return true;
    }
  };
};

exports.default = fTableApi;
//# sourceMappingURL=fTableApi.js.map