import {
   crHeader,
   crRow,
   toNumberFormatAll,
   addHideHandler
 } from './tpFn';

const _crSimple = ({
  id,
  point
}) => {
   const {
     y,
     status,
     d,
     category,
     c,
     series
   } = point
   , { name, color } = series || {}
   , _c = category || c
   , _date = d ? `${_c}-${d}` : _c
   return `${crHeader(_date, id)}
   <div class="tp__body">
     ${crRow('Value', toNumberFormatAll(y), { status })}
     ${crRow('Seria', name, { color })}
   </div>`;
 };

const _crRemove = ({
  id,
  point
}) => {
  const { y, c, category, status } = point;
  return `${crHeader(c || category, id)}
  <div class="tp__body">
    ${crRow('Value', toNumberFormatAll(y), { status })}
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

const tpCategory = {
  simple: {
    fnTemplate: _crSimple,
  },
  remove: {
    fnTemplate: _crRemove,
    onAfterRender: _addCategoryHandlers
  }
};

export default tpCategory
