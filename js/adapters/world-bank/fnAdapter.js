'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ymdToUTC = _AdapterFn2.default.ymdToUTC,
    valueMoving = _AdapterFn2.default.valueMoving;


var fnAdapter = {
  crId: function crId(option) {
    var _option$one = option.one,
        one = _option$one === undefined ? '' : _option$one,
        _option$two = option.two,
        two = _option$two === undefined ? '' : _option$two;

    return one + '_' + two;
  },
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
    var title = option.title,
        dataSource = option.dataSource,
        _id = fnAdapter.crId(option);

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