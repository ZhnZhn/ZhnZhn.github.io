"use strict";

exports.__esModule = true;
exports.CHT_YEARLY = exports.CHT_TREE_MAP_CLUSTER = exports.CHT_TREE_MAP_2_CLUSTER = exports.CHT_TREE_MAP_2 = exports.CHT_TREE_MAP = exports.CHT_SPLINE = exports.CHT_SCATTER_UP = exports.CHT_SCATTER_DOWN = exports.CHT_SCATTER = exports.CHT_MAP = exports.CHT_LINE = exports.CHT_DOT_SET = exports.CHT_COLUMN_SET = exports.CHT_COLUMN_CLUSTER = exports.CHT_COLUMN = exports.CHT_BAR_WITH_LABELS = exports.CHT_BAR_TREE_MAP = exports.CHT_BAR_SET = exports.CHT_BAR_CLUSTER = exports.CHT_BAR = exports.CHT_AREA_YEARLY = exports.CHT_AREA = void 0;
const CHT_AREA = exports.CHT_AREA = 'AREA',
  CHT_SPLINE = exports.CHT_SPLINE = 'SPLINE',
  CHT_LINE = exports.CHT_LINE = 'LINE',
  CHT_COLUMN = exports.CHT_COLUMN = 'COLUMN';
const _crClusterType = chartType => `${chartType}_CLUSTER`,
  _crSetType = chartType => `${chartType}_SET`;
const CHT_BAR = exports.CHT_BAR = "BAR",
  CHT_BAR_CLUSTER = exports.CHT_BAR_CLUSTER = _crClusterType(CHT_BAR),
  CHT_BAR_SET = exports.CHT_BAR_SET = _crSetType(CHT_BAR),
  CHT_BAR_WITH_LABELS = exports.CHT_BAR_WITH_LABELS = `${CHT_BAR}_WITH_LABELS`,
  CHT_COLUMN_SET = exports.CHT_COLUMN_SET = _crSetType(CHT_COLUMN),
  CHT_COLUMN_CLUSTER = exports.CHT_COLUMN_CLUSTER = _crClusterType(CHT_COLUMN),
  CHT_TREE_MAP = exports.CHT_TREE_MAP = "TREE_MAP",
  CHT_TREE_MAP_CLUSTER = exports.CHT_TREE_MAP_CLUSTER = _crClusterType(CHT_TREE_MAP),
  CHT_TREE_MAP_2 = exports.CHT_TREE_MAP_2 = `${CHT_TREE_MAP}_2`,
  CHT_TREE_MAP_2_CLUSTER = exports.CHT_TREE_MAP_2_CLUSTER = _crClusterType(CHT_TREE_MAP_2),
  CHT_BAR_TREE_MAP = exports.CHT_BAR_TREE_MAP = `BAR_${CHT_TREE_MAP}`;
const CHT_MAP = exports.CHT_MAP = 'MAP',
  CHT_DOT_SET = exports.CHT_DOT_SET = 'DOT_SET';
const CHT_YEARLY = exports.CHT_YEARLY = 'YEARLY';
const CHT_AREA_YEARLY = exports.CHT_AREA_YEARLY = 'AREA_YEARLY';
const CHT_SCATTER = exports.CHT_SCATTER = 'SCATTER';
const CHT_SCATTER_UP = exports.CHT_SCATTER_UP = 'SCATTER_UP';
const CHT_SCATTER_DOWN = exports.CHT_SCATTER_DOWN = 'SCATTER_DOWN';
//# sourceMappingURL=ChartType.js.map