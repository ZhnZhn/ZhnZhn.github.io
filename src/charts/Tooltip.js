import {
  formatNumber
} from '../utils/formatNumberFn';

import {
  splineValueDmy,
  splineValueTdmyIf
} from './tp/tpSpline';
import {
  categorySimple,
  categoryRemove
} from './tp/tpCategory';
import {
  scatterExDividend,
  scatterExValue
} from './tp/tpScatter';
import {
  stockAth
} from './tp/tpStock';
import {
  sparkStackedArea,
  sparkTreeMap
} from './tp/tpSpark';
import { treeMapValue } from './tp/tpTreeMap';
import { donutValue } from './tp/tpDonut';
import { addHideHandler } from './tp/tpFn';

import {
  crTpId,
  //toNumberFormat
} from './ChartFn';
import {
  toDmy
} from './dateFormat';

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
      fnDateFormat=toDmy,
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

export const tooltipValueDmy = _fFormatter({...splineValueDmy})
export const tooltipValueTdmyIf = _fFormatter({...splineValueTdmyIf})

export const tooltipCategorySimple = _fFormatter({...categorySimple})
export const tooltipCategory = _fFormatter({...categoryRemove})

export const tooltipExDividend = _fFormatter({...scatterExDividend})
export const tooltipExValue = _fFormatter({...scatterExValue})

export const tooltipAth = _fFormatter({...stockAth})

export const tooltipDonut = _fFormatter({...donutValue})

export const tooltipSparkStackedArea = _fFormatter({...sparkStackedArea})
export const tooltipSparkTreeMap = _fFormatter({...sparkTreeMap})

export const tooltipTreeMap = _fFormatter({...treeMapValue})
