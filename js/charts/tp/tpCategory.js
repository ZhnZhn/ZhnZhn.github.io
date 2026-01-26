"use strict";

exports.__esModule = true;
exports.categorySimple = exports.categoryRemove = void 0;
var _formatNumberFn = require("../../utils/formatNumberFn");
var _tpFn = require("./tpFn");
const _crSimple = _ref => {
  let {
    id,
    point
  } = _ref;
  const {
      y,
      status,
      d,
      category,
      c,
      series
    } = point,
    {
      name,
      color
    } = series || {},
    _c = category || c,
    _date = d ? `${_c}-${d}` : _c;
  return `${(0, _tpFn.crHeader)(_date, id)}
   <div class="tp__body">
     ${(0, _tpFn.crRow)('Value', (0, _formatNumberFn.formatAllNumber)(y), {
    status
  })}
     ${(0, _tpFn.crRow)('Seria', name, {
    color
  })}
   </div>`;
};
const _crRemove = _ref2 => {
  let {
    id,
    point
  } = _ref2;
  const {
    y,
    c,
    category,
    status
  } = point;
  return `${(0, _tpFn.crHeader)(c || category, id)}
  <div class="tp__body">
    ${(0, _tpFn.crRow)('Value', (0, _formatNumberFn.formatAllNumber)(y), {
    status
  })}
    <div class='tp__bt' id=${id + '_R'}>
         Remove
    </div>
  </div>`;
};
const _addCategoryHandlersImpl = (id, point) => {
  (0, _tpFn.addHideHandler)(id, point);
  (0, _tpFn.addHideHandler)(id + '_R', point, _point => _point.series.chart.zhRemoveCategory(point.category));
};
const _addCategoryHandlers = (id, point) => {
  setTimeout(() => _addCategoryHandlersImpl(id, point), 1);
};
const categorySimple = exports.categorySimple = {
  fnTemplate: _crSimple
};
const categoryRemove = exports.categoryRemove = {
  fnTemplate: _crRemove,
  onAfterRender: _addCategoryHandlers
};
//# sourceMappingURL=tpCategory.js.map