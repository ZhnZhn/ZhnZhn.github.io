'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tpFn = require('./tpFn');

var _tpFn2 = _interopRequireDefault(_tpFn);

var _tpConfig = require('./tpConfig');

var _tpConfig2 = _interopRequireDefault(_tpConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crHeader = _tpFn2.default.crHeader,
    crRow = _tpFn2.default.crRow,
    crSpan = _tpFn2.default.crSpan,
    toNumberFormatAll = _tpFn2.default.toNumberFormatAll,
    fHide = _tpFn2.default.fHide;


var _crSimple = function _crSimple(_ref) {
  var id = _ref.id,
      point = _ref.point;
  var y = point.y,
      category = point.category,
      c = point.c,
      _point$series = point.series,
      series = _point$series === undefined ? {} : _point$series,
      name = series.name,
      color = series.color;

  return crHeader(category || c, id) + '\n   <div class="tp__body">\n     ' + crRow('Value', toNumberFormatAll(y)) + '\n     ' + crRow('Seria', name, { color: color }) + '\n   </div>';
};

//style='cursor:pointer;pointer-events:visible;color:cadetblue;'
var _crRemove = function _crRemove(_ref2) {
  var id = _ref2.id,
      point = _ref2.point;
  var y = point.y,
      c = point.c,
      category = point.category;

  return crHeader(c || category, id) + '\n  <div class="tp__body">\n    ' + crRow('Value', toNumberFormatAll(y)) + '\n    <div class=\'tp__bt\' id=' + (id + '_R') + '>\n         Remove\n    </div>\n  </div>';
};

var _addCategoryHandlersImpl = function _addCategoryHandlersImpl(id, point) {
  var _n = document.getElementById(id);
  if (_n) {
    _n.addEventListener('click', fHide(id, point));
  }
  var _bt = document.getElementById(id + '_R');
  if (_bt) {
    _bt.addEventListener('click', function () {
      fHide(id, point)();
      point.series.chart.zhRemoveCategory(point.category);
    });
  }
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

  return crHeader(c, id) + '\n  <div class="tp__body">\n    <div>\n      ' + crSpan('High', high) + '\n      ' + crSpan('', yHigh, { color: _tpConfig2.default.YEAR_C }) + '\n    </div>\n    <div>\n      ' + crSpan('&nbsp;Low', low) + '\n      ' + crSpan('', yLow, { color: _tpConfig2.default.YEAR_C }) + '\n    </div>\n  </div>';
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

exports.default = tpCategory;
//# sourceMappingURL=tpCategory.js.map