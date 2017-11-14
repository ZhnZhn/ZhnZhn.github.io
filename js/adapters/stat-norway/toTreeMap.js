'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _jsonstat = require('jsonstat');

var _jsonstat2 = _interopRequireDefault(_jsonstat);

var _Chart = require('../../charts/Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _ConfigBuilder = require('../../charts/ConfigBuilder');

var _ConfigBuilder2 = _interopRequireDefault(_ConfigBuilder);

var _Tooltip = require('../../charts/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _fnAdapter = require('./fnAdapter');

var _fnAdapter2 = _interopRequireDefault(_fnAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _crZhConfig = _fnAdapter2.default.crZhConfig;
var _numberFormat = _fnAdapter2.default.numberFormat;

var C = {
  TITLE: 'Statisctics Norway: All Items'
};

var NUMBER_STYLE = 'style="color:#333;"';
var _crPointName = function _crPointName(label, value) {
  return label + ' <br/>\n  <span ' + NUMBER_STYLE + '>' + _numberFormat(value) + '</span>';
};

var _fCrTreeMapPoint = function _fCrTreeMapPoint(c, title) {
  return function (v, i) {
    var label = c.Category(i).label,
        value = v.value;
    return {
      name: _crPointName(label, value),
      value: value, label: label, title: title
    };
  };
};

var _toHm = function _toHm(arr) {
  var hm = Object.create(null);
  arr.forEach(function (item) {
    hm[item.caption] = item;
  });
  return hm;
};

var _fIsPoint = function _fIsPoint(dfT, hm, depth) {
  return function (p) {
    if (dfT && p.label === dfT) {
      return false;
    }
    if (hm[p.label].d !== depth) {
      return false;
    }
    return p.y !== null && p.y !== 0;
  };
};

var _findLevelBy = function _findLevelBy(data, from, sum, stopSum) {
  var _maxIndex = data.length;
  if (from >= _maxIndex) {
    return { index: _maxIndex, sum: sum };
  }

  var index = _maxIndex,
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
  return { index: index, sum: sum };
};

var _findLevelIndex = function _findLevelIndex(data, level1, level2) {
  var _t = data.reduce(function (acc, p) {
    return acc + p.value;
  }, 0),
      _v1 = _t / 100 * level1,
      _v2 = _t / 100 * level2,
      _findLevelBy2 = _findLevelBy(data, 0, 0, _v1),
      index1 = _findLevelBy2.index,
      sum1 = _findLevelBy2.sum,
      _findLevelBy3 = _findLevelBy(data, index1, sum1, _v2),
      index2 = _findLevelBy3.index;


  return { index1: index1, index2: index2 };
};

var _compareByValue = function _compareByValue(a, b) {
  return a.value - b.value;
};

var _crCategory = function _crCategory(option, by, depth) {
  var _option$items = option.items,
      items = _option$items === undefined ? [] : _option$items,
      dfC = option.dfC,
      dfT = option.dfT,
      dfC2 = option.dfC2,
      dfT2 = option.dfT2;

  switch (by) {
    case '2':
      return {
        category: dfC2,
        cTotal: dfT2,
        itemSlice: items[0].slice,
        depth: depth
      };
    default:
      return {
        category: dfC,
        cTotal: dfT,
        itemSlice: items[1].slice,
        depth: depth
      };
  }
};

var _addPercent = function _addPercent(data) {
  var _total = data.reduce(function (acc, item) {
    return acc + item.value;
  }, 0),
      _onePercent = _total / 100;
  return data.map(function (p) {
    return (0, _extends3.default)({}, p, {
      percent: parseFloat((p.value / _onePercent).toFixed(2))
    });
  });
};

var _addColor = function _addColor(data, level60, level90) {
  var period = _Chart2.default.COLOR_PERIOD,
      base1 = _Chart2.default.COLOR_BASE1,
      base2 = _Chart2.default.COLOR_BASE2;

  var _level90 = level90 - level60;
  var deltaColor = void 0;
  data.forEach(function (point, pointIndex) {
    if (pointIndex < level60) {
      deltaColor = pointIndex * (period / level60);
      point.color = _Chart2.default.fCreateMonoColor(base1, deltaColor);
    } else if (pointIndex < level60 + _level90) {
      deltaColor = (pointIndex - level60) * (period / _level90);
      point.color = _Chart2.default.fCreateMonoColor(base2, deltaColor);
    } else {
      point.color = _Chart2.default.fnGetMonoColor(pointIndex - level60 - _level90);
    }
  });
};

var _crData = function _crData(values, categories, tidId, option) {
  var selectOptions = option.selectOptions,
      depth = option.depth,
      cTotal = option.cTotal;

  return values.map(_fCrTreeMapPoint(categories, tidId)).filter(_fIsPoint(cTotal, _toHm(selectOptions[0]), depth)).sort(_compareByValue).reverse();
};

var toTreeMap = {
  crConfig: function crConfig(json, option) {
    var category = option.category,
        itemSlice = option.itemSlice,
        time = option.time,
        dfTSlice = option.dfTSlice,
        ds = (0, _jsonstat2.default)(json).Dataset(0),
        times = ds.Dimension("Tid").id,
        categories = ds.Dimension(category),
        tidId = time || times[times.length - 1],
        values = ds.Data((0, _extends3.default)({ Tid: tidId }, itemSlice, dfTSlice)),
        _d1 = _crData(values, categories, tidId, option),
        _c = _d1.map(function (item) {
      return item.c;
    }),
        seriaType = option.seriaType,
        isCluster = option.isCluster,
        _option$items2 = option.items,
        items = _option$items2 === undefined ? [] : _option$items2,
        _subtitle = (items[1].caption || '') + ': ' + time,
        _data = _addPercent(_d1),
        _findLevelIndex2 = _findLevelIndex(_data, 60, 90),
        index1 = _findLevelIndex2.index1,
        index2 = _findLevelIndex2.index2;

    if (isCluster) {
      _addColor(_data, index1, index2);
    }

    var _seria = (0, _ConfigBuilder2.default)().initTreeMap(_Tooltip2.default.treeMap, {
      zhSeriaId: 'id_TREE_MAP',
      data: _data
    }).toConfig();
    var config = (0, _ConfigBuilder2.default)().initBaseTreeMap(_c, seriaType).addCaption(C.TITLE, _subtitle).addSeries(_seria).add({
      chart: {
        spacingTop: 25,
        marginTop: 50,
        marginRight: 5,
        height: 500
      },
      zhConfig: _crZhConfig(option)
    }).alignButtonExport().toConfig();

    return config;
  },

  fCrConfig: function fCrConfig() {
    var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return function (json, option) {
      return toTreeMap.crConfig(json, (0, _extends3.default)({}, option, param, _crCategory(option, config.by, config.depth)));
    };
  }
};

exports.default = toTreeMap;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\stat-norway\toTreeMap.js.map