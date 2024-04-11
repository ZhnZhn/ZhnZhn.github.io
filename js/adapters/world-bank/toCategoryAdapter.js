"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _AdapterFn = require("../AdapterFn");
var _compareByFn = require("../compareByFn");
var _CategoryFn = require("../CategoryFn");
var _crAdapterCategory = _interopRequireDefault(require("../crAdapterCategory"));
const REG_DIGIT = /\d/;
const CATEGORY_IDS = ["ZH", "ZI", "XC", "EU", "XD", "XE", "ZB", "XF", "ZT", "XG", "XH", "XI", "XY", "XJ", "ZJ", "XL", "XM", "XN", "XO", "ZQ", "XP", "XQ", "XU", "OE", "ZF", "ZG", "XT"];
const _isCategoryId = (0, _AdapterFn.isInArrStr)(CATEGORY_IDS);
const _crData = (json, option) => {
    const _crValue = (0, _AdapterFn.fCrValue)(option),
      _data = json[1];
    return (0, _AdapterFn.isArr)(_data) ? (0, _compareByFn.sortDescByPnY)(_data.reduce((data, point) => {
      const {
          country,
          value
        } = point || {},
        {
          id
        } = country || {};
      if (id && !REG_DIGIT.test(id) && !_isCategoryId(id) && (0, _AdapterFn.isNumber)(value)) {
        data.push((0, _CategoryFn.crCategoryPoint)(_crValue(point.value), country.value));
      }
      return data;
    }, [])) : [];
  },
  toCategoryAdapter = (0, _crAdapterCategory.default)(_crData);
var _default = exports.default = toCategoryAdapter;
//# sourceMappingURL=toCategoryAdapter.js.map