"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _jsonstat = _interopRequireDefault(require("jsonstat"));

var _domSanitize = _interopRequireDefault(require("../../utils/domSanitize"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _TreeMapFn = require("../TreeMapFn");

var _fnAdapter = require("./fnAdapter");

const _isArr = Array.isArray;

const _fCrTreeMapPoint = (c, title) => (v, i) => {
  const {
    value
  } = v;
  return {
    label: (0, _domSanitize.default)(c.Category(i).label),
    value,
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

  if (p.label.split(' ')[0].length !== 2) {
    return false;
  }
  /*
  if ( hm[p.label].d !== depth) {
    return false;
  }
  */


  return p.y !== null && p.y !== 0;
};

const _compareByValue = (a, b) => b.value - a.value;

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

  return [data.map(p => {
    p.percent = (0, _fnAdapter.roundBy)(p.value / _onePercent);
    p.name = (0, _TreeMapFn.crPointName)(p.label, p.percent);
    return p;
  }), _total];
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

  return values.map(_fCrTreeMapPoint(categories, Tid)).filter(_fIsPoint(cTotal, _toHm(selectOptions[0]), depth)).sort(_compareByValue);
};

const toTreeMap = {
  crConfig: (json, option) => {
    const {
      category,
      itemSlice,
      time,
      dfTSlice,
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
          [data, total] = _addPercent(_d1);

    if (isCluster) {
      (0, _TreeMapFn.addColorsTo)({
        data,
        total
      });
    }

    const config = (0, _ConfigBuilder.default)().treeMapConfig(data).addCaption(_title, _subtitle).add((0, _fnAdapter.crChartOption)(ds, Tid, option)).toConfig();
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