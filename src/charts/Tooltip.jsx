
import ChartFn from './ChartFn'

import tpSpline from './tp/tpSpline'
import tpCategory from './tp/tpCategory'
import tpScatter from './tp/tpScatter'
import tpStock from './tp/tpStock'
import tpSpark from './tp/tpSpark'
import tpTreeMap from './tp/tpTreeMap'
import tpDonut from './tp/tpDonut'

const {
  crTpId,
  toNumberFormat,
  toDateFormatDMY
} = ChartFn;

const _fHide = (id, point) => function _fnHide() {
  document.getElementById(id)
          .removeEventListener('click', _fnHide);
  if (point.series) {
     point.series.chart.zhTooltip.hide();
  }
}
const _addHideHandler = (id, point) => {
  const _n = document.getElementById(id);
  if (_n){
    _n.addEventListener('click', _fHide(id, point))
  }
}
const _fnAddHandlerClose = function(id, point){
  setTimeout( function(){
    _addHideHandler(id, point)
  }, 1);
}


const _fFormatter = function( option ){
  return function(){
   const {
          fnTemplate, onAfterRender=_fnAddHandlerClose,
          fnDateFormat = toDateFormatDMY,
          isWithColor, isWithValueText, isWithValue
         } = option
       , point = this
       , series = point.series
       , date = fnDateFormat(point.x)
       , color = isWithColor
           ? point.color || series.color
           : undefined
       , { zhValueText, name='Value',
           //id, zhSeriaId
         } = series.userOptions
       //, _id = zhSeriaId || id || 'TP'
       , _id = crTpId()
       , valueText = isWithValueText
            ? zhValueText || name
            : 'Value'
       , value = isWithValue
            ? toNumberFormat(point.y)
            : null;

       onAfterRender(_id, point)

       return fnTemplate({ id: _id, date, color, valueText, value, point });
  }
}

const Tooltip = {
  fnBasePointFormatter: _fFormatter({...tpSpline.value}),
  fnBasePointFormatterT: _fFormatter({...tpSpline.valueDmyt}),

  categorySimple: _fFormatter({...tpCategory.simple}),
  category: _fFormatter({...tpCategory.remove}),
  categoryRHLY: _fFormatter({...tpCategory.rhly}),

  exDividend: _fFormatter({...tpScatter.exDividend}),
  splitRatio: _fFormatter({...tpScatter.splitRatio}),
  exValue: _fFormatter({...tpScatter.exValue}),
  eps: _fFormatter({...tpScatter.eps}),

  volume: _fFormatter({...tpStock.volume}),
  volumeDmyt: _fFormatter({...tpStock.volumeDmyt}),
  ath: _fFormatter({...tpStock.ath}),
  hl: _fFormatter({...tpStock.hl}),

  donut: _fFormatter({...tpDonut.value}),

  sparkStackedArea: _fFormatter({...tpSpark.stackedArea}),
  sparkTreeMap: _fFormatter({...tpSpark.treeMap}),

  treeMap: _fFormatter({...tpTreeMap.value})
}

export default Tooltip
