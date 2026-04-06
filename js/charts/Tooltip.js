"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.tooltipValueTdmyIf = exports.tooltipValueDmy = exports.tooltipTreeMap = exports.tooltipExValue = exports.tooltipExDividend = exports.tooltipDonut = exports.tooltipCategorySimple = exports.tooltipCategory = exports.tooltipAth = void 0;
var _tpSpline = require("./tp/tpSpline");
var _tpCategory = require("./tp/tpCategory");
var _tpScatter = require("./tp/tpScatter");
var _tpStock = require("./tp/tpStock");
var _tpTreeMap = require("./tp/tpTreeMap");
var _tpDonut = require("./tp/tpDonut");
var _crTooltipFormatter = _interopRequireDefault(require("./crTooltipFormatter"));
const tooltipValueDmy = exports.tooltipValueDmy = (0, _crTooltipFormatter.default)({
  ..._tpSpline.splineValueDmy
});
const tooltipValueTdmyIf = exports.tooltipValueTdmyIf = (0, _crTooltipFormatter.default)({
  ..._tpSpline.splineValueTdmyIf
});
const tooltipCategorySimple = exports.tooltipCategorySimple = (0, _crTooltipFormatter.default)({
  ..._tpCategory.categorySimple
});
const tooltipCategory = exports.tooltipCategory = (0, _crTooltipFormatter.default)({
  ..._tpCategory.categoryRemove
});
const tooltipExDividend = exports.tooltipExDividend = (0, _crTooltipFormatter.default)({
  ..._tpScatter.scatterExDividend
});
const tooltipExValue = exports.tooltipExValue = (0, _crTooltipFormatter.default)({
  ..._tpScatter.scatterExValue
});
const tooltipAth = exports.tooltipAth = (0, _crTooltipFormatter.default)({
  ..._tpStock.stockAth
});
const tooltipDonut = exports.tooltipDonut = (0, _crTooltipFormatter.default)({
  ..._tpDonut.donutValue
});
const tooltipTreeMap = exports.tooltipTreeMap = (0, _crTooltipFormatter.default)({
  ..._tpTreeMap.treeMapValue
});
//# sourceMappingURL=Tooltip.js.map