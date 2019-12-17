"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsonstat = _interopRequireDefault(require("jsonstat"));

var _kMeans = _interopRequireDefault(require("../../math/k-means"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _Tooltip = _interopRequireDefault(require("../../charts/Tooltip"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var isYNumber = _fnAdapter["default"].isYNumber,
    crTitle = _fnAdapter["default"].crTitle,
    crTid = _fnAdapter["default"].crTid,
    crChartOption = _fnAdapter["default"].crChartOption;
var COLORS = ['#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b', '#74c476'];

var _fCrCategoryPoint = function _fCrCategoryPoint(c) {
  return function (v, i) {
    return {
      y: v.value,
      name: c.Category(i).label,
      c: c.Category(i).label
    };
  };
};

var _fIsCategoryPoint = function _fIsCategoryPoint(dfT) {
  return function (p) {
    if (dfT && p.c === dfT) {
      return false;
    }

    return isYNumber(p) && p.y !== 0;
  };
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
      _clusters = _kMeans["default"].crUnarySortedCluster(_points);

  _colorItems(data, _clusters);
};

var _crCategory = function _crCategory(option, by) {
  var _option$items = option.items,
      items = _option$items === void 0 ? [] : _option$items,
      dfC = option.dfC,
      dfT = option.dfT,
      dfC2 = option.dfC2,
      dfT2 = option.dfT2;
  var itemSlice = {},
      i;

  switch (by) {
    case '2':
      for (i = 0; i < items.length; i++) {
        if (i !== 1 && items[i]) {
          Object.assign(itemSlice, items[i].slice);
        }
      }

      return {
        category: dfC2,
        cTotal: dfT2,
        itemSlice: items[0].slice
      };

    default:
      for (i = 1; i < items.length; i++) {
        Object.assign(itemSlice, items[i].slice);
      }

      return {
        category: dfC,
        cTotal: dfT,
        itemSlice: itemSlice
      };
  }
};

var _crData = function _crData(values, c, cTotal) {
  if (!Array.isArray(values)) {
    return [];
  }

  return values.map(_fCrCategoryPoint(c)).filter(_fIsCategoryPoint(cTotal)).sort(_compareByY).reverse();
};

var toColumn = {
  fCrConfig: function fCrConfig(param, config) {
    if (param === void 0) {
      param = {};
    }

    if (config === void 0) {
      config = {};
    }

    return function (json, option) {
      return toColumn.crConfig(json, (0, _extends2["default"])({}, option, {}, param, {}, _crCategory(option, config.by)));
    };
  },
  crConfig: function crConfig(json, option) {
    var category = option.category,
        itemSlice = option.itemSlice,
        time = option.time,
        dfTSlice = option.dfTSlice,
        seriaType = option.seriaType,
        seriaColor = option.seriaColor,
        isCluster = option.isCluster,
        _option$items2 = option.items,
        items = _option$items2 === void 0 ? [] : _option$items2,
        cTotal = option.cTotal,
        _ds = (0, _jsonstat["default"])(json).Dataset(0),
        _dimC = _ds.Dimension(category),
        Tid = crTid(time, _ds),
        _values = _ds.Data((0, _extends2["default"])({
      Tid: Tid
    }, itemSlice, {}, dfTSlice)),
        _title = crTitle(option),
        _twoC = (items[1] || {}).caption || '',
        _subtitle = _twoC + ": " + Tid,
        data = _crData(_values, _dimC, cTotal),
        _c = data.map(function (item) {
      return item.c;
    }),
        config = (0, _ConfigBuilder["default"])().barOrColumnConfig(seriaType, _c).addCaption(_title, _subtitle).addTooltip(_Tooltip["default"].category).add((0, _extends2["default"])({
      chart: {
        spacingTop: 25
      }
    }, crChartOption(_ds, Tid, option))).toConfig();

    if (isCluster) {
      _setClusters(data);
    }

    Object.assign(config.series[0], {
      color: seriaColor,
      data: data
    });
    return config;
  }
};
var _default = toColumn;
exports["default"] = _default;
//# sourceMappingURL=toColumn.js.map