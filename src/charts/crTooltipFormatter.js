import { toWmdy } from '../utils/dateFormatFn';
import { formatNumber } from '../utils/numberFormatFn';

import { addHideHandler } from './tp/tpFn';

import { crTpId } from './ChartFn';

const _addCloseHandler = (
  id,
  point
) => {
  setTimeout(() => addHideHandler(id, point), 1);
};

const _formatValue = (
  point,
  value
) => value != null
  && (point?.series?.name || '').slice(0, 4) === 'ROC('
  ? `${value}%`
  : value;

// biome-ignore-start lint/complexity/noUselessThisAlias: minification and readibility
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
        ? formatNumber(point.y)
        : null
   , id = crTpId();

   onAfterRender(id, point)

   return fnTemplate({
     id,
     date,
     color,
     valueText,
     value: _formatValue(point, value),
     point
   });
};
// biome-ignore-end lint/complexity/noUselessThisAlias: minification and readibility

export default _fFormatter
