"use strict";

exports.__esModule = true;
exports["default"] = void 0;

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

var _crArrQuery = function _crArrQuery(items) {
  var arrQuery = [];
  items.forEach(function (item) {
    var _ref = item || {},
        slice = _ref.slice;

    for (var propName in slice) {
      arrQuery.push({
        code: propName,
        selection: {
          filter: 'item',
          values: [slice[propName]] //filter: 'all',
          //values: ['*']

        }
      });
    }
  });
  return arrQuery;
};

var _isCategory = function _isCategory(seriaType) {
  return seriaType === "BAR_CLUSTER" || seriaType === "BAR_SET" || seriaType === "COLUMN_SET" || seriaType === "COLUMN_CLUSTER" || seriaType === "TREE_MAP" || seriaType === "TREE_MAP_CLUSTER" || seriaType === "TREE_MAP_2" || seriaType === "TREE_MAP_2_CLUSTER";
};

var _checkSeriaCategory = function _checkSeriaCategory(arr, _ref2) {
  var dfC = _ref2.dfC,
      seriaType = _ref2.seriaType;

  if (dfC && _isCategory(seriaType)) {
    var _arr = arr.filter(function (item) {
      return item.code !== dfC;
    });

    _arr.unshift({
      code: dfC,
      selection: {
        filter: "all",
        values: ["*"]
      }
    });

    return _arr;
  }

  return arr;
};

var fTableApi = function fTableApi(ROOT_URL) {
  return {
    getRequestUrl: function getRequestUrl(option) {
      var _option$proxy = option.proxy,
          proxy = _option$proxy === void 0 ? '' : _option$proxy,
          dfId = option.dfId,
          url = option.url;

      if (url) {
        return url;
      }

      return option.url = "" + proxy + ROOT_URL + "/" + dfId;
    },
    crOptionFetch: function crOptionFetch(option) {
      var _option$items = option.items,
          items = _option$items === void 0 ? [] : _option$items,
          isTop12 = option.isTop12,
          isTop6 = option.isTop6,
          optionFetch = option.optionFetch;

      if (optionFetch) {
        return optionFetch;
      }

      var arrQuery = _crArrQuery(items);

      _checkTop(isTop12, '12', arrQuery);

      _checkTop(isTop6, '6', arrQuery);

      return option.optionFetch = {
        method: 'POST',
        body: JSON.stringify({
          query: _checkSeriaCategory(arrQuery, option),
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

var _default = fTableApi;
exports["default"] = _default;
//# sourceMappingURL=fTableApi.js.map