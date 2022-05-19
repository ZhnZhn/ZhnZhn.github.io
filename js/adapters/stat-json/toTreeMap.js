"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _jsonstat = _interopRequireDefault(require("jsonstat"));

var _Chart = _interopRequireDefault(require("../../charts/Chart"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _Tooltip = require("../../charts/Tooltip");

var _fnAdapter = require("./fnAdapter");

const NUMBER_STYLE = 'style="color:#333;"',
      _isArr = Array.isArray,
      _crPointName = (label, value) => label + " <br/>\n  <span " + NUMBER_STYLE + ">" + (0, _fnAdapter.numberFormat)(value) + "</span>";

const _fCrTreeMapPoint = (c, title) => (v, i) => {
  const label = c.Category(i).label,
        {
    value
  } = v;
  return {
    name: _crPointName(label, value),
    value,
    label,
    title
  };
};

const _toHm = arr => {
  const hm = Object.create(null);
  arr.forEach(item => {
    hm[item.caption] = item;
  });
  return hm;
};

const _fIsPoint = (dfT, hm, depth) => p => {
  if (dfT && p.label === dfT) {
    return false;
  }

  if (hm[p.label].d !== depth) {
    return false;
  }

  return p.y !== null && p.y !== 0;
};

const _findLevelBy = (data, from, sum, stopSum) => {
  const _maxIndex = data.length;

  if (from >= _maxIndex) {
    return {
      index: _maxIndex,
      sum
    };
  }

  let index = _maxIndex,
      i = from;

  for (; i < _maxIndex; i++) {
    sum += data[i].value;

    if (sum >= stopSum) {
      index = i;
      break;
    }
  }

  if (index < _maxIndex) {
    index += 1;
  }

  return [index, sum];
};

const _findLevelIndex = (data, level1, level2) => {
  const _t = data.reduce((acc, p) => acc + p.value, 0),
        _v1 = _t / 100 * level1,
        _v2 = _t / 100 * level2,
        [index1, sum1] = _findLevelBy(data, 0, 0, _v1),
        [index2] = _findLevelBy(data, index1, sum1, _v2);

  return [index1, index2];
};

const _compareByValue = (a, b) => a.value - b.value;

const _crCategory = (option, by, depth) => {
  const {
    items = [],
    dfC,
    dfT,
    dfC2,
    dfT2
  } = option;

  switch (by) {
    case '2':
      return {
        category: dfC2,
        cTotal: dfT2,
        itemSlice: items[0].slice,
        depth
      };

    default:
      return {
        category: dfC,
        cTotal: dfT,
        itemSlice: items[1].slice,
        depth
      };
  }
};

const _addPercent = data => {
  const _total = data.reduce((acc, item) => acc + item.value, 0),
        _onePercent = _total / 100;

  return data.map(p => ({ ...p,
    percent: (0, _fnAdapter.roundBy)(p.value / _onePercent)
  }));
};

const _addColor = (data, level60, level90) => {
  const period = _Chart.default.COLOR_PERIOD,
        base1 = _Chart.default.COLOR_BASE1,
        base2 = _Chart.default.COLOR_BASE2;

  const _level90 = level90 - level60;

  let deltaColor;
  data.forEach((point, pointIndex) => {
    if (pointIndex < level60) {
      deltaColor = pointIndex * (period / level60);
      point.color = _Chart.default.crMonoColor(base1, deltaColor);
    } else if (pointIndex < level60 + _level90) {
      deltaColor = (pointIndex - level60) * (period / _level90);
      point.color = _Chart.default.crMonoColor(base2, deltaColor);
    } else {
      point.color = _Chart.default.getMonoColor(pointIndex - level60 - _level90);
    }
  });
};

const _crData = (values, categories, Tid, option) => {
  const {
    selectOptions,
    depth,
    cTotal
  } = option;

  if (!_isArr(values)) {
    return [];
  }

  return values.map(_fCrTreeMapPoint(categories, Tid)).filter(_fIsPoint(cTotal, _toHm(selectOptions[0]), depth)).sort(_compareByValue).reverse();
};

const toTreeMap = {
  crConfig: (json, option) => {
    const {
      category,
      itemSlice,
      time,
      dfTSlice,
      seriaType,
      isCluster,
      items = []
    } = option,
          ds = (0, _jsonstat.default)(json).Dataset(0),
          categories = ds.Dimension(category),
          Tid = (0, _fnAdapter.crTid)(time, ds),
          _title = (0, _fnAdapter.crTitle)(option),
          _subtitle = (items[1].caption || '') + ": " + Tid,
          values = ds.Data({
      Tid,
      ...itemSlice,
      ...dfTSlice
    }),
          _d1 = _crData(values, categories, Tid, option),
          _c = _d1.map(item => item.c),
          data = _addPercent(_d1),
          [index1, index2] = _findLevelIndex(data, 60, 90);

    if (isCluster) {
      _addColor(data, index1, index2);
    }

    const _seria = (0, _ConfigBuilder.default)().treeMapSeria(_Tooltip.tooltipTreeMap, {
      data
    }).toSeria();

    const config = (0, _ConfigBuilder.default)().treeMapConfig(_c, seriaType).addCaption(_title, _subtitle).addSeries(_seria).add((0, _fnAdapter.crChartOption)(ds, Tid, option)).toConfig();
    return config;
  },
  fCrConfig: function (param, config) {
    if (param === void 0) {
      param = {};
    }

    if (config === void 0) {
      config = {};
    }

    return (json, option) => toTreeMap.crConfig(json, { ...option,
      ...param,
      ..._crCategory(option, config.by, config.depth)
    });
  }
};
var _default = toTreeMap;
exports.default = _default;
//# sourceMappingURL=toTreeMap.js.map