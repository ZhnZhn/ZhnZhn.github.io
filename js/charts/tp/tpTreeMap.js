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
    toNumberFormatAll = _tpFn2.default.toNumberFormatAll;


var _crTreeMap = function _crTreeMap(_ref) {
  var id = _ref.id,
      point = _ref.point;

  var title = point.title,
      label = point.label,
      value = point.value,
      _point$percent = point.percent,
      percent = _point$percent === undefined ? '' : _point$percent,
      _percent = percent ? '(' + percent + '%)' : '',
      _value = toNumberFormatAll(value) + ' ' + _percent;

  return crHeader(title, id) + '\n  <div class="tp_body">\n    ' + crRow('', label) + '\n    ' + crRow('', _value, { color: _tpConfig2.default.YEAR_C }) + '\n  </div>\n  ';
};

var tpTreeMap = {
  value: {
    fnTemplate: _crTreeMap
  }
};

exports.default = tpTreeMap;
//# sourceMappingURL=tpTreeMap.js.map