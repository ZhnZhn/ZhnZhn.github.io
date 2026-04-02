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

export default _fFormatter
