'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _jsonstat = require('jsonstat');

var _jsonstat2 = _interopRequireDefault(_jsonstat);

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

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
        value = item.value,
        country = _fnIdToCountry(id);

    categories.push(country);
    data.push({ y: value, c: country });
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
      //data.push({ y: hm[id], c: id });
    } else {
      //data.push({ y: 0, c: id });
      data.push(0);
    }
  });
  return data;
};

var JsonStatFn = {
  createGeoSlice: function createGeoSlice(json, configSlice) {
    var ds = (0, _jsonstat2.default)(json).Dataset(0);
    var _sGeo = ds.Data(configSlice),
        time = void 0;

    if (!_sGeo || _sGeo.length === 0) {
      var maxIndex = (0, _fnStyle.getFromNullable)(ds.Dimension("time").id, []).length;
      if (maxIndex > 0) {
        time = ds.Dimension("time").id[maxIndex - 1];
        _sGeo = ds.Data((0, _extends3.default)({}, configSlice, { time: time }));
      }
    } else {
      time = configSlice.time;
    }

    return {
      dGeo: (0, _fnStyle.getFromNullable)(ds.Dimension("geo"), { id: [] }),
      //sGeo : getFromNullable(ds.Data(configSlice), [])
      sGeo: (0, _fnStyle.getFromNullable)(_sGeo, []),
      time: time
    };
  },

  crGeoSeria: function crGeoSeria(json, configSlice) {
    var ds = (0, _jsonstat2.default)(json).Dataset(0),
        data = (0, _fnStyle.getFromNullable)(ds.Data(configSlice), []).map(function (obj) {
      return obj.value;
    }).filter(function (value) {
      return value !== null;
    });
    return {
      date: (0, _fnStyle.getFromNullable)(ds.Dimension("time")),
      data: data
    };
  },

  trJsonToCategory: function trJsonToCategory(json, configSlice) {
    var _JsonStatFn$createGeo = JsonStatFn.createGeoSlice(json, configSlice),
        dGeo = _JsonStatFn$createGeo.dGeo,
        sGeo = _JsonStatFn$createGeo.sGeo;

    return _fnFetchHmIdCountry().then(function () {
      return (0, _fnStyle.Box)(_combineToArr(dGeo.id, sGeo)).map(function (arr) {
        return arr.sort(_AdapterFn2.default.compareByValueId);
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
//# sourceMappingURL=JsonStatFn.js.map