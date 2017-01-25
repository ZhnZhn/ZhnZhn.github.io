'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonstat = require('jsonstat');

var _jsonstat2 = _interopRequireDefault(_jsonstat);

var _lodash = require('lodash.sortby');

var _lodash2 = _interopRequireDefault(_lodash);

var _fnStyle = require('../../utils/fnStyle');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var URL_ID_COUNTRY = './data/eurostat/id-country.json';

var hmIdCountry = {};
var isHmFetched = false;
var _fnFetchHmIdCountry = function _fnFetchHmIdCountry() {
  return !isHmFetched ? fetch(URL_ID_COUNTRY).then(function (response) {
    return response.json();
  }).then(function (json) {
    hmIdCountry = json.hm;
    isHmFetched = true;
    return hmIdCountry;
  }).catch(function (err) {
    return hmIdCountry;
  }) : Promise.resolve(hmIdCountry);
};

var _fnIdToCountry = function _fnIdToCountry(id) {
  var name = hmIdCountry[id];
  return name ? name : id;
};

var _combineToArr = function _combineToArr(dGeo, sGeo) {
  var arr = [];
  dGeo.forEach(function (id, index) {
    if (sGeo[index] != null && sGeo[index].value != null) {
      arr.push({ id: id, value: sGeo[index].value });
    }
  });
  return arr;
};
var _splitForConfig = function _splitForConfig(arr) {
  var categories = [],
      data = [];
  var max = Number.NEGATIVE_INFINITY,
      min = Number.POSITIVE_INFINITY;
  arr.forEach(function (item) {
    var id = item.id,
        value = item.value;

    categories.push(_fnIdToCountry(id));
    data.push(value);
    if (value >= max) {
      max = value;
    }
    if (value <= min) {
      min = value;
    }
  });
  return { categories: categories, data: data, min: min, max: max };
};

/***********************/

var _combineToHm = function _combineToHm(ids, sGeo) {
  var hm = {};
  ids.forEach(function (id, index) {
    if (sGeo[index] != null && sGeo[index].value != null) {
      hm[_fnIdToCountry(id)] = sGeo[index].value;
    }
  });
  return hm;
};
var _trHmToData = function _trHmToData(hm, categories) {
  var data = [];
  categories.forEach(function (id) {
    if (hm[id] != null) {
      data.push(hm[id]);
    } else {
      data.push(0);
    }
  });
  return data;
};

var JsonStatFn = {
  createGeoSlice: function createGeoSlice(json, configSlice) {
    var ds = (0, _jsonstat2.default)(json).Dataset(0);
    return {
      dGeo: (0, _fnStyle.getFromNullable)(ds.Dimension("geo"), { id: [] }),
      sGeo: (0, _fnStyle.getFromNullable)(ds.Data(configSlice), [])
    };
  },

  trJsonToCategory: function trJsonToCategory(json, configSlice) {
    var _JsonStatFn$createGeo = JsonStatFn.createGeoSlice(json, configSlice),
        dGeo = _JsonStatFn$createGeo.dGeo,
        sGeo = _JsonStatFn$createGeo.sGeo;

    return _fnFetchHmIdCountry().then(function () {
      return (0, _fnStyle.Box)(_combineToArr(dGeo.id, sGeo)).map(function (arr) {
        return (0, _lodash2.default)(arr, ['value', 'id']);
      }).fold(_splitForConfig);
    });
  },
  trJsonToSeria: function trJsonToSeria(json, configSlice, categories) {
    var _JsonStatFn$createGeo2 = JsonStatFn.createGeoSlice(json, configSlice),
        dGeo = _JsonStatFn$createGeo2.dGeo,
        sGeo = _JsonStatFn$createGeo2.sGeo;

    return (0, _fnStyle.Box)(_combineToHm(dGeo.id, sGeo)).fold(function (hm) {
      return _trHmToData(hm, categories);
    });
  }
};

exports.default = JsonStatFn;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\eurostat\JsonStatFn.js.map