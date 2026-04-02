"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.tooltipValueTdmyIf = exports.tooltipValueDmy = exports.tooltipTreeMap = exports.tooltipExValue = exports.tooltipExDividend = exports.tooltipDonut = exports.tooltipCategorySimple = exports.tooltipCategory = exports.tooltipAth = void 0;
var _dateFormatFn = require("../utils/dateFormatFn");
var _numberFormatFn = require("../utils/numberFormatFn");
var _tpSpline = require("./tp/tpSpline");
var _tpCategory = require("./tp/tpCategory");
var _tpScatter = require("./tp/tpScatter");
var _tpStock = require("./tp/tpStock");
var _tpTreeMap = require("./tp/tpTreeMap");
var _tpDonut = require("./tp/tpDonut");
var _crTooltipFormatter = _interopRequireDefault(require("./crTooltipFormatter"));
/*
import {
  sparkStackedArea,
  sparkTreeMap
} from './tp/tpSpark';
*/

/*
import { addHideHandler } from './tp/tpFn';

import { crTpId } from './ChartFn';

const _addCloseHandler = (
  id,
  point
) => {
  setTimeout(() => addHideHandler(id, point), 1);
};

const _fFormatter = (option) => function(){
   const {
      fnTemplate,
      onAfterRender=_addCloseHandler,
      fnDateFormat=toWmdy,
      isWithColor,
      isWithValueText,
      isWithValue
     } = option
   , point = this
   , { series } = point
   , {
     zhValueText,
     name='Value'
   } = series.userOptions
   , date = fnDateFormat(point.x)
   , color = isWithColor
       ? point.color || series.color
       : void 0
   , valueText = isWithValueText
        ? zhValueText || name
        : 'Value'
   , value = isWithValue
        //? toNumberFormat(point.y)
        ? formatNumber(point.y)
        : null
   , id = crTpId();

   onAfterRender(id, point)

   return fnTemplate({
     id,
     date,
     color,
     valueText,
     value,
     point
   });
};
*/

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

//export const tooltipSparkStackedArea = _fFormatter({...sparkStackedArea})
//export const tooltipSparkTreeMap = _fFormatter({...sparkTreeMap})

const tooltipTreeMap = exports.tooltipTreeMap = (0, _crTooltipFormatter.default)({
  ..._tpTreeMap.treeMapValue
});
//# sourceMappingURL=Tooltip.js.map