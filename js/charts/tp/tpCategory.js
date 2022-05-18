"use strict";

exports.__esModule = true;
exports.default = void 0;

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
        _date = d ? _c + "-" + d : _c;

  return (0, _tpFn.crHeader)(_date, id) + "\n   <div class=\"tp__body\">\n     " + (0, _tpFn.crRow)('Value', (0, _tpFn.toNumberFormatAll)(y), {
    status
  }) + "\n     " + (0, _tpFn.crRow)('Seria', name, {
    color
  }) + "\n   </div>";
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
  return (0, _tpFn.crHeader)(c || category, id) + "\n  <div class=\"tp__body\">\n    " + (0, _tpFn.crRow)('Value', (0, _tpFn.toNumberFormatAll)(y), {
    status
  }) + "\n    <div class='tp__bt' id=" + (id + '_R') + ">\n         Remove\n    </div>\n  </div>";
};

const _addCategoryHandlersImpl = (id, point) => {
  (0, _tpFn.addHideHandler)(id, point);
  (0, _tpFn.addHideHandler)(id + '_R', point, _point => _point.series.chart.zhRemoveCategory(point.category));
};

const _addCategoryHandlers = (id, point) => {
  setTimeout(() => _addCategoryHandlersImpl(id, point), 1);
};

const tpCategory = {
  simple: {
    fnTemplate: _crSimple
  },
  remove: {
    fnTemplate: _crRemove,
    onAfterRender: _addCategoryHandlers
  }
};
var _default = tpCategory;
exports.default = _default;
//# sourceMappingURL=tpCategory.js.map