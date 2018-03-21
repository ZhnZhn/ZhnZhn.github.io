'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ymdToUTC = _AdapterFn2.default.ymdToUTC,
    valueMoving = _AdapterFn2.default.valueMoving;


var _crId = function _crId(one, two) {
  return one + '_' + two;
};

var fnAdapter = {
  crData: function crData(arrIn) {
    if (!Array.isArray(arrIn)) {
      return [];
    }
    var d = [],
        max = arrIn.length;
    var i = 1,
        p = void 0;
    for (; i < max; i++) {
      p = arrIn[i];
      if (p.value != null) {
        d.push({
          x: ymdToUTC(p.date),
          y: p.value
        });
      }
    }
    return d.reverse();
  },

  crConfigOptions: function crConfigOptions(option, data) {
    var one = option.one,
        two = option.two,
        title = option.title,
        dataSource = option.dataSource,
        _id = _crId(one, two);

    return {
      zhConfig: {
        key: _id,
        id: _id,
        itemCaption: title,
        isWithoutAdd: true,
        dataSource: dataSource
      },
      valueMoving: valueMoving(data)
    };
  }
};

exports.default = fnAdapter;
//# sourceMappingURL=fnAdapter.js.map