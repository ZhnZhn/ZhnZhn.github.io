"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.trJsonToSeria = exports.trJsonToCategory = void 0;
var _fnFetch = require("../../utils/fnFetch");
var _fGetLazyValue = require("../../utils/fGetLazyValue");
var _pipe = _interopRequireDefault(require("../../utils/pipe"));
var _JsonStatFn = require("../JsonStatFn");
var _compareByFn = require("../compareByFn");
const FN_TRUE = () => true,
  URL_ID_COUNTRY = './data/eurostat/id-country.json',
  _crHmIdCountry = () => (0, _fnFetch.fetchJsonHm)(URL_ID_COUNTRY),
  _getAsyncHmIdCountry = (0, _fGetLazyValue.fGetLazyValue)(_crHmIdCountry, true),
  _getCountryById = id => (_getAsyncHmIdCountry(true) || {})[id] || id;
const _splitForConfig = function (arr, isAddToCategories) {
  if (isAddToCategories === void 0) {
    isAddToCategories = FN_TRUE;
  }
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
      geoEntity = _getCountryById(id);
    if (isAddToCategories(geoEntity)) {
      categories.push(geoEntity);
      data.push({
        y: value,
        c: geoEntity,
        id: geoEntity,
        status
      });
      if (value > max) {
        max = value;
      }
      if (value < min) {
        min = value;
      }
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
      hm[_getCountryById(id)] = value;
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
const trJsonToCategory = (json, isAddToCategories) => _getAsyncHmIdCountry().then(() => (0, _pipe.default)((0, _JsonStatFn.crData)(_crCategoryPoint, json), arr => arr.sort(_compareByFn.compareByValueId), arr => _splitForConfig(arr, isAddToCategories)));
exports.trJsonToCategory = trJsonToCategory;
const trJsonToSeria = (json, categories) => (0, _pipe.default)(_combineToHm((0, _JsonStatFn.crData)(_crCategoryPoint, json)), hm => _trHmToData(hm, categories));
exports.trJsonToSeria = trJsonToSeria;
//# sourceMappingURL=JsonStatFn.js.map