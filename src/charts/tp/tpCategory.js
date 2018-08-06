
import fns from './tpFn'
import C from './tpConfig'

const {
   crHeader, crRow, crSpan,
   toNumberFormatAll,
   fHide
 } = fns;


 const _crSimple = function({ id, point }){
   const { y, category, c} = point;
   return `${crHeader(category || c, id)}
   <div class="tp__body">
     ${crRow('Value', toNumberFormatAll(y))}
   </div>`;
 };

//style='cursor:pointer;pointer-events:visible;color:cadetblue;'
const _crRemove = function({ id, point }){
  const { y, c } = point;
  return `${crHeader(c, id)}
  <div class="tp__body">
    ${crRow('Value', toNumberFormatAll(y))}
    <div class='tp__bt' id=${id+'_R'}>
         Remove
    </div>
  </div>`;
};

const _addCategoryHandlersImpl = (id, point) => {
  const _n = document.getElementById(id);
  if (_n){
    _n.addEventListener('click', fHide(id, point))
  }
  const _bt = document.getElementById(id+'_R');
  if (_bt) {
    _bt.addEventListener('click', function(){
       fHide(id, point)()
       point.series.chart.zhRemoveCategory(point.category)
    })
  }
};
const _addCategoryHandlers = (id, point) => {
  setTimeout(() => _addCategoryHandlersImpl(id, point), 1)
}

const _fnCategoryRHLY = function({ id, point }){
  const { high, yHigh, low, yLow, c } = point;
  return `${crHeader(c, id)}
  <div class="tp__body">
    <div>
      ${crSpan('High', high)}
      ${crSpan('', yHigh, { color: C.YEAR_C })}
    </div>
    <div>
      ${crSpan('&nbsp;Low', low)}
      ${crSpan('', yLow, { color: C.YEAR_C })}
    </div>
  </div>`;
};

const tpCategory = {
  simple: {
    fnTemplate: _crSimple,
  },
  remove: {
    fnTemplate: _crRemove,
    onAfterRender: _addCategoryHandlers
  },
  rhly: {
    fnTemplate: _fnCategoryRHLY
  }
};

export default tpCategory
