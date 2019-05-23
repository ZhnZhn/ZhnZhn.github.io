
import fns from './tpFn'
import C from './tpConfig'

const {
   crHeader, crRow, crSpan,
   toNumberFormatAll,
   addHideHandler   
 } = fns;

const _crSimple = function({ id, point }){
   const { y, category, c, series={}} = point
   , { name, color } = series;
   return `${crHeader(category || c, id)}
   <div class="tp__body">
     ${crRow('Value', toNumberFormatAll(y))}
     ${crRow('Seria', name, { color })}
   </div>`;
 };

//style='cursor:pointer;pointer-events:visible;color:cadetblue;'
const _crRemove = function({ id, point }){
  const { y, c, category } = point;
  return `${crHeader(c || category, id)}
  <div class="tp__body">
    ${crRow('Value', toNumberFormatAll(y))}
    <div class='tp__bt' id=${id+'_R'}>
         Remove
    </div>
  </div>`;
};

const _addCategoryHandlersImpl = (id, point) => {
  addHideHandler(id, point)
  addHideHandler(id+'_R', point, _point => _point
    .series.chart.zhRemoveCategory(point.category)
  )
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
