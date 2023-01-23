"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.trJsonToSeria = exports.trJsonToCategory = exports.createGeoSlice = exports.crGeoSeria = void 0;
var _jsonstat = _interopRequireDefault(require("jsonstat"));
var _compareByFn = require("../compareByFn");
var _pipe = _interopRequireDefault(require("../../utils/pipe"));
var _fetchHmIdCountry = require("./fetchHmIdCountry");
const _isArr = Array.isArray;
const _combineToArr = function (dGeo, sGeo, status) {
  if (status === void 0) {
    status = {};
  }
  return dGeo.reduce((arr, id, index) => {
    if (sGeo[index] != null && sGeo[index].value != null) {
      arr.push({
        id,
        value: sGeo[index].value,
        status: status[index]
      });
    }
    return arr;
  }, []);
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
      country = (0, _fetchHmIdCountry.getCountryById)(id);
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
      hm[(0, _fetchHmIdCountry.getCountryById)(id)] = value;
    }
  });
  return hm;
};
const _trHmToData = (hm, categories) => categories.map(id => ({
  y: hm[id] || null,
  c: id
}));
const _isGeoSliceEmpty = sGeo => _isArr(sGeo) ? sGeo.filter(_ref => {
  let {
    value
  } = _ref;
  return Boolean(value);
}).length === 0 : true;
const createGeoSlice = function (json, configSlice, dfTime) {
  if (configSlice === void 0) {
    configSlice = {};
  }
  const ds = (0, _jsonstat.default)(json).Dataset(0);

  // 1) Try create _sGeo with configSlice
  let time = configSlice.time,
    _sGeo = ds.Data(configSlice);

  // 2) Try create _sGeo with configSlice and dfTime from dialog
  if (dfTime && _isGeoSliceEmpty(_sGeo)) {
    _sGeo = ds.Data({
      ...configSlice,
      ...{
        time: dfTime
      }
    });
    time = dfTime;
  }

  // 3) Try create _sGeo with maxIndex time available in ds
  if (_isGeoSliceEmpty(_sGeo)) {
    const maxIndex = (ds.Dimension("time").id || []).length;
    if (maxIndex > 0) {
      time = ds.Dimension("time").id[maxIndex - 1];
      _sGeo = ds.Data({
        ...configSlice,
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
};
exports.createGeoSlice = createGeoSlice;
const crGeoSeria = (json, configSlice) => {
  const ds = (0, _jsonstat.default)(json).Dataset(0) || {},
    data = ((ds.Data == null ? void 0 : ds.Data(configSlice)) || []).map(obj => obj.value).filter(value => value !== null);
  return {
    date: (ds.Dimension == null ? void 0 : ds.Dimension("time")) || {},
    data
  };
};
exports.crGeoSeria = crGeoSeria;
const trJsonToCategory = (json, configSlice) => {
  const {
    dGeo,
    sGeo
  } = createGeoSlice(json, configSlice);
  return (0, _fetchHmIdCountry.fetchHmIdCountry)().then(() => (0, _pipe.default)(_combineToArr(dGeo.id, sGeo, json.status), arr => arr.sort(_compareByFn.compareByValueId), _splitForConfig));
};
exports.trJsonToCategory = trJsonToCategory;
const trJsonToSeria = function (json, configSlice, categories) {
  if (configSlice === void 0) {
    configSlice = {};
  }
  const {
    dGeo,
    sGeo
  } = createGeoSlice(json, configSlice);
  return (0, _pipe.default)(_combineToHm(dGeo.id, sGeo), hm => _trHmToData(hm, categories));
};
exports.trJsonToSeria = trJsonToSeria;
//# sourceMappingURL=JsonStatFn.js.map