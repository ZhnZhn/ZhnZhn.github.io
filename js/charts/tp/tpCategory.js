"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _tpFn = _interopRequireDefault(require("./tpFn"));

const {
  crHeader,
  crRow,
  toNumberFormatAll,
  addHideHandler
} = _tpFn.default;

const _crSimple = function ({
  id,
  point
}) {
  const {
    y,
    status,
    d,
    category,
    c,
    series = {}
  } = point,
        {
    name,
    color
  } = series,
        _c = category || c,
        _date = d ? _c + "-" + d : _c;

  return crHeader(_date, id) + "\n   <div class=\"tp__body\">\n     " + crRow('Value', toNumberFormatAll(y), {
    status
  }) + "\n     " + crRow('Seria', name, {
    color
  }) + "\n   </div>";
};

const _crRemove = function ({
  id,
  point
}) {
  const {
    y,
    c,
    category,
    status
  } = point;
  return crHeader(c || category, id) + "\n  <div class=\"tp__body\">\n    " + crRow('Value', toNumberFormatAll(y), {
    status
  }) + "\n    <div class='tp__bt' id=" + (id + '_R') + ">\n         Remove\n    </div>\n  </div>";
};

const _addCategoryHandlersImpl = (id, point) => {
  addHideHandler(id, point);
  addHideHandler(id + '_R', point, _point => _point.series.chart.zhRemoveCategory(point.category));
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