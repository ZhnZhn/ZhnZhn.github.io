"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _jsonstat = _interopRequireDefault(require("jsonstat"));
var _ChartType = require("../../constants/ChartType");
var _CategoryFn = require("../CategoryFn");
var _crCategoryConfig = _interopRequireDefault(require("../crCategoryConfig"));
var _fnAdapter = require("./fnAdapter");
const _assign = Object.assign,
  _isArr = Array.isArray;
const _fCrCategoryPoint = c => (v, i) => (0, _CategoryFn.crCategoryPoint)(v.value, c.Category(i).label);
const _fIsCategoryPoint = dfT => p => dfT && p.c === dfT ? false : (0, _fnAdapter.isYNumber)(p) && p.y !== 0;
const _compareByY = (a, b) => b.y - a.y;
const _crCategory = option => {
  const {
      items = [],
      dfC,
      dfT,
      dfC2,
      dfT2
    } = option,
    _dfC = dfC || dfC2,
    cTotal = dfT || dfT2,
    itemSlice = {};
  let i, _item;
  for (i = 0; i < items.length; i++) {
    _item = items[i];
    if (_item) {
      _assign(itemSlice, _item.slice);
    }
  }
  delete itemSlice[_dfC];
  return {
    category: _dfC,
    cTotal,
    itemSlice
  };
};
const _crData = (values, c, cTotal) => {
  const _hm = Object.create(null);
  return _isArr(values) ? values.map(_fCrCategoryPoint(c)).filter(_fIsCategoryPoint(cTotal)).sort(_compareByY).reduce((data, p) => {
    const _c = p.c,
      _suffixIndex = _hm[_c];
    if (!_suffixIndex) {
      _hm[_c] = 2;
    } else {
      const _c2 = _c + " (" + _suffixIndex + ")";
      _hm[_c] += 1;
      p.c = _c2;
      p.name = _c2;
    }
    data.push(p);
    return data;
  }, []) : [];
};
const _crValues = (_ds, _cSlice) => {
  const _v = _ds.Data(_cSlice);
  return _v !== null ? _v : [];
};
const _crSlice = (json, timeId, time, itemSlice, dfTSlice) => ({
  [timeId]: time,
  ...itemSlice,
  ...dfTSlice
});
const _crTitle = (dfTitle, option) => dfTitle ? dfTitle + ": All Items" : (0, _fnAdapter.crTitle)(option);
const _crSubtitle = (items, category) => {
  const _arr = [];
  items.forEach(item => {
    const {
      slice,
      caption
    } = item || {};
    if (slice && !slice[category] && caption) {
      _arr.push((0, _fnAdapter.toUpperCaseFirst)(caption));
    }
  });
  return _arr.join(": ");
};
const _crConfig = (json, option) => {
    const {
        category,
        cTotal,
        itemSlice,
        time,
        timeId = 'Tid',
        dfTitle,
        dfTSlice,
        seriaType,
        seriaColor,
        isCluster,
        items = []
      } = option,
      _ds = (0, _jsonstat.default)(json).Dataset(0),
      _dimC = _ds.Dimension(category),
      Tid = (0, _fnAdapter.crTid)(time, _ds),
      _cSlice = _crSlice(json, timeId, time, itemSlice, dfTSlice),
      _values = _crValues(_ds, _cSlice),
      _title = _crTitle(dfTitle, option),
      _subtitle = _crSubtitle(items, category),
      data = _crData(_values, _dimC, cTotal),
      config = (0, _crCategoryConfig.default)(_title, _subtitle, seriaType, seriaColor, data, isCluster, option.isAlg);
    _assign(config, (0, _fnAdapter.crChartOption)(_ds, Tid, option));
    return config;
  },
  _fCrConfig = (seriaType, isCluster) => (json, option) => _crConfig(json, {
    ...option,
    seriaType,
    isCluster,
    ..._crCategory(option)
  });
const routerColumnBarSet = {
  [_ChartType.CHT_COLUMN_SET]: _fCrConfig(_ChartType.CHT_COLUMN),
  [_ChartType.CHT_COLUMN_CLUSTER]: _fCrConfig(_ChartType.CHT_COLUMN, true),
  [_ChartType.CHT_BAR_SET]: _fCrConfig(_ChartType.CHT_BAR),
  [_ChartType.CHT_BAR_CLUSTER]: _fCrConfig(_ChartType.CHT_BAR, true)
};
var _default = exports.default = routerColumnBarSet;
//# sourceMappingURL=toColumn.js.map