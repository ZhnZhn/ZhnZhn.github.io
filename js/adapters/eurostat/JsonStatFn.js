"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _jsonstat = _interopRequireDefault(require("jsonstat"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _Box = _interopRequireDefault(require("../../utils/Box"));

const URL_ID_COUNTRY = './data/eurostat/id-country.json';
const _isArr = Array.isArray;
let hmIdCountry = {};
let isHmFetched = false;

const _fetchHmIdCountry = () => !isHmFetched ? fetch(URL_ID_COUNTRY).then(res => res.json()).then(json => {
  hmIdCountry = json.hm;
  isHmFetched = true;
  return hmIdCountry;
}).catch(err => {
  return hmIdCountry;
}) : Promise.resolve(hmIdCountry);

const _getCountryById = id => hmIdCountry[id] || id;

const _combineToArr = (dGeo, sGeo, status = {}) => {
  const arr = [];
  dGeo.forEach((id, index) => {
    if (sGeo[index] != null && sGeo[index].value != null) {
      arr.push({
        id,
        value: sGeo[index].value,
        status: status[index]
      });
    }
  });
  return arr;
};

const _splitForConfig = arr => {
  const categories = [],
        data = [];
  let max = Number.NEGATIVE_INFINITY,
      min = Number.POSITIVE_INFINITY;
  arr.forEach(item => {
    const {
      id,
      value,
      status
    } = item,
          country = _getCountryById(id);

    categories.push(country);
    data.push({
      y: value,
      c: country,
      id: country,
      status
    });

    if (value >= max) {
      max = value;
    }

    if (value <= min) {
      min = value;
    }
  });
  return {
    categories,
    data,
    min,
    max
  };
};
/***********************/


const _combineToHm = (ids, sGeo) => {
  const hm = {};
  ids.forEach((id, index) => {
    const {
      value
    } = sGeo[index] || {};

    if (value != null) {
      hm[_getCountryById(id)] = value;
    }
  });
  return hm;
};

const _trHmToData = (hm, categories) => categories.map(id => ({
  y: hm[id] || null,
  c: id
}));

const _isGeoSliceEmpty = sGeo => {
  if (!_isArr(sGeo)) {
    return true;
  }

  return sGeo.filter(({
    value
  }) => Boolean(value)).length === 0 ? true : false;
};

const JsonStatFn = {
  createGeoSlice: (json, configSlice = {}, dfTime) => {
    const ds = (0, _jsonstat.default)(json).Dataset(0); // 1) Try create _sGeo with configSlice

    let time = configSlice.time,
        _sGeo = ds.Data(configSlice); // 2) Try create _sGeo with configSlice and dfTime from dialog


    if (dfTime && _isGeoSliceEmpty(_sGeo)) {
      _sGeo = ds.Data({ ...configSlice,
        ...{
          time: dfTime
        }
      });
      time = dfTime;
    } // 3) Try create _sGeo with maxIndex time available in ds


    if (_isGeoSliceEmpty(_sGeo)) {
      const maxIndex = (ds.Dimension("time").id || []).length;

      if (maxIndex > 0) {
        time = ds.Dimension("time").id[maxIndex - 1];
        _sGeo = ds.Data({ ...configSlice,
          ...{
            time
          }
        });
      }
    }

    return {
      dGeo: ds.Dimension("geo") || {
        id: []
      },
      sGeo: _sGeo || [],
      time
    };
  },
  crGeoSeria: (json, configSlice) => {
    const ds = (0, _jsonstat.default)(json).Dataset(0) || {},
          data = ((ds.Data == null ? void 0 : ds.Data(configSlice)) || []).map(obj => obj.value).filter(value => value !== null);
    return {
      date: (ds.Dimension == null ? void 0 : ds.Dimension("time")) || {},
      data
    };
  },
  trJsonToCategory: (json, configSlice) => {
    const {
      dGeo,
      sGeo
    } = JsonStatFn.createGeoSlice(json, configSlice);
    return _fetchHmIdCountry().then(() => {
      return (0, _Box.default)(_combineToArr(dGeo.id, sGeo, json.status)).map(arr => arr.sort(_AdapterFn.default.compareByValueId)).fold(_splitForConfig);
    });
  },
  trJsonToSeria: (json, configSlice, categories) => {
    const {
      dGeo,
      sGeo
    } = JsonStatFn.createGeoSlice(json, configSlice);
    return (0, _Box.default)(_combineToHm(dGeo.id, sGeo)).fold(hm => _trHmToData(hm, categories));
  }
};
var _default = JsonStatFn;
exports.default = _default;
//# sourceMappingURL=JsonStatFn.js.map