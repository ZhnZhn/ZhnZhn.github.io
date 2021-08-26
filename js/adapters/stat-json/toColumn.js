"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _jsonstat = _interopRequireDefault(require("jsonstat"));

var _kMeans = _interopRequireDefault(require("../../math/k-means"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _Tooltip = _interopRequireDefault(require("../../charts/Tooltip"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

const {
  isYNumber,
  crTitle,
  crTid,
  crChartOption
} = _fnAdapter.default;
const _assign = Object.assign,
      _isArr = Array.isArray;
const COLORS = ['#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b', '#74c476'];

const _fCrCategoryPoint = c => (v, i) => {
  const label = c.Category(i).label;
  return {
    y: v.value,
    name: label,
    c: label
  };
};

const _fIsCategoryPoint = dfT => p => {
  if (dfT && p.c === dfT) {
    return false;
  }

  return isYNumber(p) && p.y !== 0;
};

const _compareByY = (a, b) => a.y - b.y;

const _colorItems = (data, _clusters) => {
  _clusters.forEach((cluster, colorIndex) => {
    cluster.points.forEach(p => {
      data[p.id].color = COLORS[colorIndex];
    });
  });
};

const _setClusters = data => {
  const _points = data.map((item, index) => {
    const arr = [item.y, 0];
    arr.id = index;
    return arr;
  }),
        _clusters = _kMeans.default.crUnarySortedCluster(_points);

  _colorItems(data, _clusters);
};

const _crCategory = (option, by) => {
  const {
    items = [],
    dfC,
    dfT,
    dfC2,
    dfT2
  } = option;
  let itemSlice = {},
      i;

  switch (by) {
    case '2':
      for (i = 0; i < items.length; i++) {
        if (i !== 1 && items[i]) {
          _assign(itemSlice, items[i].slice);
        }
      }

      return {
        category: dfC2,
        cTotal: dfT2,
        itemSlice
      };

    default:
      for (i = 1; i < items.length; i++) {
        _assign(itemSlice, items[i].slice);
      }

      return {
        category: dfC,
        cTotal: dfT,
        itemSlice
      };
  }
};

const _crData = (values, c, cTotal) => _isArr(values) ? values.map(_fCrCategoryPoint(c)).filter(_fIsCategoryPoint(cTotal)).sort(_compareByY).reverse() : [];

const toColumn = {
  fCrConfig: (param = {}, config = {}) => {
    return (json, option) => toColumn.crConfig(json, { ...option,
      ...param,
      ..._crCategory(option, config.by)
    });
  },
  crConfig: (json, option) => {
    const {
      category,
      itemSlice,
      time,
      dfTSlice,
      seriaType,
      seriaColor,
      isCluster,
      items = [],
      cTotal
    } = option,
          _ds = (0, _jsonstat.default)(json).Dataset(0),
          _dimC = _ds.Dimension(category),
          Tid = crTid(time, _ds),
          _values = _ds.Data({
      Tid,
      ...itemSlice,
      ...dfTSlice
    }),
          _title = crTitle(option),
          _twoC = (items[1] || {}).caption || '',
          _subtitle = _twoC + ": " + Tid,
          data = _crData(_values, _dimC, cTotal),
          _c = data.map(item => item.c),
          config = (0, _ConfigBuilder.default)().barOrColumnConfig(seriaType, _c).addCaption(_title, _subtitle).addTooltip(_Tooltip.default.category).add({
      chart: {
        spacingTop: 25
      },
      ...crChartOption(_ds, Tid, option)
    }).toConfig();

    if (isCluster) {
      _setClusters(data);
    }

    _assign(config.series[0], {
      color: seriaColor,
      data: data
    });

    return config;
  }
};
var _default = toColumn;
exports.default = _default;
//# sourceMappingURL=toColumn.js.map