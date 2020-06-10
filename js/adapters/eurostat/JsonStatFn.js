"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsonstat = _interopRequireDefault(require("jsonstat"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _Box = _interopRequireDefault(require("../../utils/Box"));

var URL_ID_COUNTRY = './data/eurostat/id-country.json';
var _isArr = Array.isArray;
var hmIdCountry = {};
var isHmFetched = false;

var _fnFetchHmIdCountry = function _fnFetchHmIdCountry() {
  return !isHmFetched ? fetch(URL_ID_COUNTRY).then(function (res) {
    return res.json();
  }).then(function (json) {
    hmIdCountry = json.hm;
    isHmFetched = true;
    return hmIdCountry;
  })["catch"](function (err) {
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
      arr.push({
        id: id,
        value: sGeo[index].value
      });
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
    data.push({
      y: value,
      c: country,
      id: country
    });

    if (value >= max) {
      max = value;
    }

    if (value <= min) {
      min = value;
    }
  });
  return {
    categories: categories,
    data: data,
    min: min,
    max: max
  };
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
      data.push(hm[id]); //data.push({ y: hm[id], c: id });
    } else {
      //data.push({ y: 0, c: id });
      data.push(0);
    }
  });
  return data;
};

var _isEmptyGeoSlice = function _isEmptyGeoSlice(_sGeo) {
  if (!_isArr(_sGeo)) {
    return true;
  }

  return _sGeo.filter(function (_ref) {
    var value = _ref.value;
    return Boolean(value);
  }).length === 0 ? true : false;
};

var JsonStatFn = {
  createGeoSlice: function createGeoSlice(json, configSlice, dfTime) {
    if (configSlice === void 0) {
      configSlice = {};
    }

    var ds = (0, _jsonstat["default"])(json).Dataset(0); // 1) Try create _sGeo with configSlice

    var time = configSlice.time,
        _sGeo = ds.Data(configSlice); // 2) Try create _sGeo with configSlice and dfTime from dialog


    if (dfTime && _isEmptyGeoSlice(_sGeo)) {
      _sGeo = ds.Data((0, _extends2["default"])({}, configSlice, {
        time: dfTime
      }));
      time = dfTime;
    } // 3) Try create _sGeo with maxIndex time available in ds


    if (_isEmptyGeoSlice(_sGeo)) {
      var maxIndex = (ds.Dimension("time").id || []).length;

      if (maxIndex > 0) {
        time = ds.Dimension("time").id[maxIndex - 1];
        _sGeo = ds.Data((0, _extends2["default"])({}, configSlice, {
          time: time
        }));
      }
    }

    return {
      dGeo: ds.Dimension("geo") || {
        id: []
      },
      sGeo: _sGeo || [],
      time: time
    };
  },
  crGeoSeria: function crGeoSeria(json, configSlice) {
    var ds = (0, _jsonstat["default"])(json).Dataset(0) || {},
        data = ((ds.Data == null ? void 0 : ds.Data(configSlice)) || []).map(function (obj) {
      return obj.value;
    }).filter(function (value) {
      return value !== null;
    });
    return {
      date: (ds.Dimension == null ? void 0 : ds.Dimension("time")) || {},
      data: data
    };
  },
  trJsonToCategory: function trJsonToCategory(json, configSlice) {
    var _JsonStatFn$createGeo = JsonStatFn.createGeoSlice(json, configSlice),
        dGeo = _JsonStatFn$createGeo.dGeo,
        sGeo = _JsonStatFn$createGeo.sGeo;

    return _fnFetchHmIdCountry().then(function () {
      return (0, _Box["default"])(_combineToArr(dGeo.id, sGeo)).map(function (arr) {
        return arr.sort(_AdapterFn["default"].compareByValueId);
      }).fold(_splitForConfig);
    });
  },
  trJsonToSeria: function trJsonToSeria(json, configSlice, categories) {
    var _JsonStatFn$createGeo2 = JsonStatFn.createGeoSlice(json, configSlice),
        dGeo = _JsonStatFn$createGeo2.dGeo,
        sGeo = _JsonStatFn$createGeo2.sGeo;

    return (0, _Box["default"])(_combineToHm(dGeo.id, sGeo)).fold(function (hm) {
      return _trHmToData(hm, categories);
    });
  }
};
var _default = JsonStatFn;
exports["default"] = _default;
//# sourceMappingURL=JsonStatFn.js.map