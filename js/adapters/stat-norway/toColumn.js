'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _jsonstat = require('jsonstat');

var _jsonstat2 = _interopRequireDefault(_jsonstat);

var _kMeans = require('../../math/k-means');

var _kMeans2 = _interopRequireDefault(_kMeans);

var _ConfigBuilder = require('../../charts/ConfigBuilder');

var _ConfigBuilder2 = _interopRequireDefault(_ConfigBuilder);

var _Tooltip = require('../../charts/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _fnAdapter = require('./fnAdapter');

var _fnAdapter2 = _interopRequireDefault(_fnAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _crZhConfig = _fnAdapter2.default.crZhConfig;
var _crInfo = _fnAdapter2.default.crInfo;

var C = {
  TITLE: 'Statisctics Norway: All Items'
};

var COLORS = ['#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b', '#74c476'];

var _crCategoryPoint = function _crCategoryPoint(c, v, i) {
  return {
    y: v.value,
    c: c.Category(i).label
  };
};
var _isCategoryPoint = function _isCategoryPoint(dfT, p) {
  if (dfT && p.c === dfT) {
    return false;
  }
  return p.y !== null && p.y !== 0;
};
var _compareByY = function _compareByY(a, b) {
  return a.y - b.y;
};

var _colorItems = function _colorItems(data, _clusters) {
  _clusters.forEach(function (cluster, colorIndex) {
    cluster.points.forEach(function (p) {
      data[p.id].color = COLORS[colorIndex];
    });
  });
};

var _setClusters = function _setClusters(data) {
  var _points = data.map(function (item, index) {
    var arr = [item.y, 0];
    arr.id = index;
    return arr;
  }),
      _clusters = _kMeans2.default.crUnarySortedCluster(_points);
  _colorItems(data, _clusters);
};

var _crColumnSeria = function _crColumnSeria(values, c, time, option) {
  var _crPoint = _crCategoryPoint.bind(null, c),
      _fnIs = _isCategoryPoint.bind(null, option.dfT),
      data = values.map(_crPoint).filter(_fnIs).sort(_compareByY).reverse(),
      _c = data.map(function (item) {
    return item.c;
  }),
      seriaType = option.seriaType,
      isCluster = option.isCluster,
      _option$items = option.items,
      items = _option$items === undefined ? [] : _option$items,
      _subtitle = (items[1].caption || '') + ': ' + time;


  var config = (0, _ConfigBuilder2.default)().initBaseColumnOrBar(_c, seriaType).addCaption(C.TITLE, _subtitle).add('chart', { spacingTop: 25 }).addTooltip(_Tooltip2.default.category).add('yAxis', { gridZIndex: 100 }).add('zhConfig', _crZhConfig(option)).toConfig();

  if (isCluster) {
    _setClusters(data);
  }

  config.series[0].data = data;

  return config;
};

var toColumn = {
  crConfig: function crConfig(json, option) {
    var items = option.items,
        dfC = option.dfC,
        time = option.time,
        ds = (0, _jsonstat2.default)(json).Dataset(0),
        times = ds.Dimension("Tid").id,
        _c = dfC || items[0].category,
        categories = ds.Dimension(_c),
        tidId = time || times[times.length - 1],
        values = ds.Data((0, _extends3.default)({
      Tid: tidId
    }, items[1].slice)),
        config = _crColumnSeria(values, categories, tidId, option);

    config.info = _crInfo(ds);
    return config;
  },

  fCrConfig: function fCrConfig() {
    var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return function (json, option) {
      return toColumn.crConfig(json, (0, _extends3.default)({}, option, param));
    };
  }
};

exports.default = toColumn;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\stat-norway\toColumn.js.map