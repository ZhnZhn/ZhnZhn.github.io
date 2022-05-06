"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _jsonstat = _interopRequireDefault(require("jsonstat"));

var _kMeans = _interopRequireDefault(require("../../math/k-means"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _Tooltip = _interopRequireDefault(require("../../charts/Tooltip"));

var _fnAdapter = require("./fnAdapter");

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

  return (0, _fnAdapter.isYNumber)(p) && p.y !== 0;
};

const _compareByY = (a, b) => b.y - a.y;

const _colorItems = (data, _clusters) => {
  _clusters.forEach((cluster, colorIndex) => {
    cluster.points.forEach(p => {
      data[p.id].color = COLORS[colorIndex];
    });
  });
};

const _setClusters = data => {
  if (data.length !== 0) {
    const _points = data.map((item, index) => {
      const arr = [item.y, 0];
      arr.id = index;
      return arr;
    }),
          _clusters = _kMeans.default.crUnarySortedCluster(_points);

    _colorItems(data, _clusters);
  }
};

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

const toColumn = {
  fCrConfig: function (param) {
    if (param === void 0) {
      param = {};
    }

    return (json, option) => toColumn.crConfig(json, { ...option,
      ...param,
      ..._crCategory(option)
    });
  },
  crConfig: (json, option) => {
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
          _c = data.map(item => item.c),
          config = (0, _ConfigBuilder.default)().barOrColumnConfig(seriaType, _c).addCaption(_title, _subtitle).addTooltip(_Tooltip.default.category).add({
      chart: {
        spacingTop: 25
      },
      ...(0, _fnAdapter.crChartOption)(_ds, Tid, option)
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