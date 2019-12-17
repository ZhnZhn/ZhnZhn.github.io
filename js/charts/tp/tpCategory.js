"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _tpFn = _interopRequireDefault(require("./tpFn"));

var _tpConfig = _interopRequireDefault(require("./tpConfig"));

var crHeader = _tpFn["default"].crHeader,
    crRow = _tpFn["default"].crRow,
    crSpan = _tpFn["default"].crSpan,
    toNumberFormatAll = _tpFn["default"].toNumberFormatAll,
    addHideHandler = _tpFn["default"].addHideHandler;

var _crSimple = function _crSimple(_ref) {
  var id = _ref.id,
      point = _ref.point;
  var y = point.y,
      category = point.category,
      c = point.c,
      _point$series = point.series,
      series = _point$series === void 0 ? {} : _point$series,
      name = series.name,
      color = series.color;
  return crHeader(category || c, id) + "\n   <div class=\"tp__body\">\n     " + crRow('Value', toNumberFormatAll(y)) + "\n     " + crRow('Seria', name, {
    color: color
  }) + "\n   </div>";
}; //style='cursor:pointer;pointer-events:visible;color:cadetblue;'


var _crRemove = function _crRemove(_ref2) {
  var id = _ref2.id,
      point = _ref2.point;
  var y = point.y,
      c = point.c,
      category = point.category;
  return crHeader(c || category, id) + "\n  <div class=\"tp__body\">\n    " + crRow('Value', toNumberFormatAll(y)) + "\n    <div class='tp__bt' id=" + (id + '_R') + ">\n         Remove\n    </div>\n  </div>";
};

var _addCategoryHandlersImpl = function _addCategoryHandlersImpl(id, point) {
  addHideHandler(id, point);
  addHideHandler(id + '_R', point, function (_point) {
    return _point.series.chart.zhRemoveCategory(point.category);
  });
};

var _addCategoryHandlers = function _addCategoryHandlers(id, point) {
  setTimeout(function () {
    return _addCategoryHandlersImpl(id, point);
  }, 1);
};

var _fnCategoryRHLY = function _fnCategoryRHLY(_ref3) {
  var id = _ref3.id,
      point = _ref3.point;
  var high = point.high,
      yHigh = point.yHigh,
      low = point.low,
      yLow = point.yLow,
      c = point.c;
  return crHeader(c, id) + "\n  <div class=\"tp__body\">\n    <div>\n      " + crSpan('High', high) + "\n      " + crSpan('', yHigh, {
    color: _tpConfig["default"].YEAR_C
  }) + "\n    </div>\n    <div>\n      " + crSpan('&nbsp;Low', low) + "\n      " + crSpan('', yLow, {
    color: _tpConfig["default"].YEAR_C
  }) + "\n    </div>\n  </div>";
};

var tpCategory = {
  simple: {
    fnTemplate: _crSimple
  },
  remove: {
    fnTemplate: _crRemove,
    onAfterRender: _addCategoryHandlers
  },
  rhly: {
    fnTemplate: _fnCategoryRHLY
  }
};
var _default = tpCategory;
exports["default"] = _default;
//# sourceMappingURL=tpCategory.js.map