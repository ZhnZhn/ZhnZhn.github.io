"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.trJsonToSeria = exports.trJsonToCategory = void 0;
var _JsonStatFn = require("../JsonStatFn");
var _compareByFn = require("../compareByFn");
var _pipe = _interopRequireDefault(require("../../utils/pipe"));
var _fetchHmIdCountry = require("./fetchHmIdCountry");
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
const _combineToHm = data => {
  const hm = {};
  data.forEach(point => {
    const {
      value,
      id
    } = point;
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
const _crCategoryPoint = (value, label, status) => ({
  id: label,
  value,
  status
});
const trJsonToCategory = json => (0, _fetchHmIdCountry.fetchHmIdCountry)().then(() => (0, _pipe.default)((0, _JsonStatFn.crData)(_crCategoryPoint, json), arr => arr.sort(_compareByFn.compareByValueId), _splitForConfig));
exports.trJsonToCategory = trJsonToCategory;
const trJsonToSeria = (json, categories) => (0, _pipe.default)(_combineToHm((0, _JsonStatFn.crData)(_crCategoryPoint, json)), hm => _trHmToData(hm, categories));
exports.trJsonToSeria = trJsonToSeria;
//# sourceMappingURL=JsonStatFn.js.map