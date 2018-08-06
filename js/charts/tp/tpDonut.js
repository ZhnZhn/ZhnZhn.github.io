'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tpFn = require('./tpFn');

var _tpFn2 = _interopRequireDefault(_tpFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crHeader = _tpFn2.default.crHeader,
    crRow = _tpFn2.default.crRow;


var _crDonut = function _crDonut(_ref) {
  var id = _ref.id,
      value = _ref.value,
      point = _ref.point;

  return crHeader(point.nameFull, id) + '\n  <div class="tp__body">\n    ' + crRow('Value', value) + '\n  </div>';
};

var tpDonut = {
  value: {
    fnTemplate: _crDonut,
    isWithValue: true
  }
};

exports.default = tpDonut;
//# sourceMappingURL=tpDonut.js.map