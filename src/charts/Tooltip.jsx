import tpSpline from './tp/tpSpline'
import tpCategory from './tp/tpCategory'
import tpScatter from './tp/tpScatter'
import tpStock from './tp/tpStock'
import tpSpark from './tp/tpSpark'
import tpTreeMap from './tp/tpTreeMap'
import tpDonut from './tp/tpDonut'

import fns from './tp/tpFn'

const {
  crTpId,
  toNumberFormat,
  toDmy,
  addHideHandler
} = fns;

const _fnAddHandlerClose = function(id, point){
  setTimeout(() => addHideHandler(id, point), 1);
};

const _fFormatter = (option) => function(){
   const {
      fnTemplate,
      onAfterRender=_fnAddHandlerClose,
      fnDateFormat=toDmy,
      isWithColor, isWithValueText, isWithValue
     } = option
   , point = this
   , series = point.series
   , date = fnDateFormat(point.x)
   , color = isWithColor
       ? point.color || series.color
       : void 0
   , { zhValueText, name='Value' } = series.userOptions
   , _id = crTpId()
   , valueText = isWithValueText
        ? zhValueText || name
        : 'Value'
   , value = isWithValue
        ? toNumberFormat(point.y)
        : null;

   onAfterRender(_id, point)

   return fnTemplate({
     id: _id,
     date, color,
     valueText, value,
     point
   });
};


const Tooltip = {
  vDmy: _fFormatter({...tpSpline.vDmy}),
  vTdmyIf: _fFormatter({...tpSpline.vTdmyIf}),
  vTdmy: _fFormatter({...tpSpline.vTdmy}),

  categorySimple: _fFormatter({...tpCategory.simple}),
  category: _fFormatter({...tpCategory.remove}),
  categoryRHLY: _fFormatter({...tpCategory.rhly}),

  exDividend: _fFormatter({...tpScatter.exDividend}),
  splitRatio: _fFormatter({...tpScatter.splitRatio}),
  exValue: _fFormatter({...tpScatter.exValue}),
  eps: _fFormatter({...tpScatter.eps}),

  volume: _fFormatter({...tpStock.volume}),
  volumeTdmy: _fFormatter({...tpStock.volumeTdmy}),
  volumeTdmyIf: _fFormatter({...tpStock.volumeTdmyIf}),
  ath: _fFormatter({...tpStock.ath}),

  donut: _fFormatter({...tpDonut.value}),

  sparkStackedArea: _fFormatter({...tpSpark.stackedArea}),
  sparkTreeMap: _fFormatter({...tpSpark.treeMap}),

  treeMap: _fFormatter({...tpTreeMap.value})
}

export default Tooltip
